import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "@config";
import UserModel from "@models/user";
import passport from "passport";
import LoginTokenModel from "@models/loginToken";
import Mail from "@services/mail";
import { Error } from "@interfaces/error";

const generateLoginToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({
      where: { email },
      include: [LoginTokenModel],
    });

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const token = jwt.sign({ userId: user.id }, config.secret);

    await user.$create("loginToken", { token });

    const tokenUrl = `${config.app.url}/auth/verify?token=${token}`;

    await Mail.send(
      {
        to: user.email,
        from: "info@q4care-opleidingen.nl",
        subject: "Jouw Q4Care login",
      },
      "login",
      { tokenUrl }
    );

    return res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const verifyLoginToken = async (req: Request, res: Response): Promise<void> => {
  passport.authenticate("passwordless", (err, user) => {
    if (err)
      return res
        .status(err.status || 500)
        .send({ code: err.code, message: err.message } as Error);

    req.login(user, async (uerr) => {
      if (uerr)
        return res
          .status(uerr.status || 500)
          .send({ code: uerr.code, message: uerr.message } as Error);

      await LoginTokenModel.destroy({
        where: { userId: user.id },
      });

      return res.status(200).json(user);
    });
  })(req, res);
};

const logout = async (req: Request, res: Response): Promise<void> => {
  req.logout((err) => {
    if (err)
      return res
        .status(err.status || 500)
        .send({ code: err.code, message: err.message } as Error);

    delete req.session;
    return res.sendStatus(204);
  });
};

export default {
  generateLoginToken,
  verifyLoginToken,
  logout,
};
