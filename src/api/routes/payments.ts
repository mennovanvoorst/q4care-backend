import { Router } from "express";
import PaymentController from "@controllers/payment";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import checkAuthentication from "@middlewares/checkAuthentication";
import PaymentValidator from "../validators/payment";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/payments", route);

  /* Fetch all payments */
  route.get(
    "/",
    checkAuthentication,
    validate(checkSchema(PaymentValidator.list)),
    PaymentController.list
  );

  /* Create a new payment */
  route.post(
    "/",
    checkAuthentication,
    validate(checkSchema(PaymentValidator.make)),
    PaymentController.make
  );

  /* Follow payment changes */
  route.post(
    "/webhook",
    validate(checkSchema(PaymentValidator.webhook)),
    PaymentController.webhook
  );
};
