import { Router } from "express";
import AuthController from "@controllers/auth";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import AuthValidator from "../validators/auth";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/auth", route);

  /* Generate and send a login token to an email */
  route.post(
    "/login/token",
    validate(checkSchema(AuthValidator.loginToken)),
    AuthController.generateLoginToken
  );

  /* Authenticate the user using a login token */
  route.post(
    "/login/token/verify",
    validate(checkSchema(AuthValidator.loginTokenVerify)),
    AuthController.verifyLoginToken
  );

  /* Authenticate the user using a login token */
  route.post("/logout", AuthController.logout);
};
