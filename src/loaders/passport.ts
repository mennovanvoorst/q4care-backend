import { Strategy as CustomStrategy } from "passport-custom";
import LoginToken from "@models/loginToken";
import UserModel from "@models/user";
import passport from "passport";
import { Request } from "express";

export default (): void => {
  const passwordlessStrategy = new CustomStrategy(async (req, done) => {
    const { token } = req.body;

    const loginToken = await LoginToken.findOne({
      where: { token },
      include: [
        {
          model: UserModel,
          attributes: ["id", "email", "firstName", "lastName", "flags"],
        },
      ],
    });

    if (!loginToken)
      return done(
        {
          status: 400,
          code: "RESOURCE_NOT_FOUND",
          message: "Token does not exist or is already used",
        },
        null
      );

    if (!loginToken.isValid())
      return done(
        {
          status: 400,
          code: "INVALID_ARGUMENT",
          message: "Token is invalid or expired",
        },
        null
      );

    return done(null, loginToken.user);
  });

  passport.use("passwordless", passwordlessStrategy);

  passport.serializeUser((user: UserModel, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (req: Request, user: UserModel, done) => {
    done(null, user);
  });
};
