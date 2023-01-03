/* eslint-disable no-bitwise */
import { Request, Response } from "express";
import config from "@config";
import UserModel from "@models/user";
import ProductModel from "@models/product";
import PaymentModel, { PaymentStatus } from "@models/payment";
import Mollie from "@services/mollie";
import { Error } from "@interfaces/error";
import checkPermissions from "@middlewares/checkPermissions";
import { USER_ROLES } from "@constants";
import { addDays } from "date-fns";

const make = async (req: Request, res: Response): Promise<Response> => {
  const { productId, userId } = req.body;

  try {
    const product = await ProductModel.scope(["default"]).findByPk(productId);

    if (!product)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Product does not exist",
      } as Error);

    const user = await UserModel.findByPk(userId);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const payment = await PaymentModel.create({
      productId,
      userId,
      externalId: null,
      status: PaymentStatus.open,
      value: product.value,
      currency: product.currency,
      paymentDate: new Date(),
      expirationDate: product.daysValid
        ? addDays(new Date(), product.daysValid)
        : null,
    });

    const redirectUrl = `${config.app.url}/payments?id=${payment.id}`;
    const webhookUrl = `${config.server.webhookUrl}${config.server.api}/v1/payments/webhook`;

    const transaction = await Mollie.create(
      {
        value: payment.value,
        currency: payment.currency,
        description: product.description,
        metadata: { paymentId: payment.id },
      },
      { redirectUrl, webhookUrl }
    );

    await payment.update({
      status: transaction.status,
      externalId: transaction.id,
    });

    return res.status(201).json({ checkoutUrl: transaction.getCheckoutUrl() });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const webhook = async (req: Request, res: Response): Promise<any> => {
  const { id: externalId } = req.body;

  try {
    const payment = await PaymentModel.scope([
      "default",
      "withProduct",
      "withUser",
    ]).findOne({
      where: { externalId },
    });

    if (!payment)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Payment does not exist",
      } as Error);

    const transaction = await Mollie.get(externalId);

    if (!transaction)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Transaction does not exist",
      } as Error);

    await payment.update({
      status: transaction.status,
    });

    if (
      payment.product &&
      payment.product.name === "Access" &&
      transaction.status === "paid"
    ) {
      const user = await UserModel.findByPk(payment.user.id);

      if (user) {
        await user.setAccess();
      }
    }

    return res.sendStatus(200);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const list = async (req: Request, res: Response): Promise<Response> => {
  const { limit = "20", after } = req.params;

  try {
    const users = await PaymentModel.scope(["default", "withProduct"]).findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(0, 10),
    });

    return res.status(200).json(users);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

export default {
  make,
  webhook,
  list,
};
