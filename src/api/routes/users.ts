import { Router } from "express";
import UserController from "@controllers/users";
import checkAuthentication from "@middlewares/checkAuthentication";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import checkPermissions from "@middlewares/checkPermissions";
import { USER_ROLES } from "@constants";
import UserValidator from "../validators/user";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/users", route);

  /* Returns a list of user objects */
  route.get(
    "/",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(UserValidator.list)),
    UserController.list
  );

  /* Returns the user object of the requester's account */
  route.get("/@me", checkAuthentication, UserController.getAuthenticated);

  /* Returns the user object for the specified user ID */
  route.get(
    "/:userId",
    validate(checkSchema(UserValidator.getById)),
    UserController.getById
  );

  /* Modify the requester's user account */
  route.post(
    "/",
    checkAuthentication,
    checkPermissions(USER_ROLES.admin),
    validate(checkSchema(UserValidator.create)),
    UserController.create
  );

  /* Modify the requester's user account */
  route.patch(
    "/:userId",
    checkAuthentication,
    checkPermissions(USER_ROLES.admin),
    validate(checkSchema(UserValidator.updateById)),
    UserController.updateById
  );

  /* Modify the requester's user account */
  route.patch(
    "/@me",
    checkAuthentication,
    validate(checkSchema(UserValidator.updateCurrentById)),
    UserController.updateCurrentById
  );

  /* Delete the user permanently */
  route.delete(
    "/:userId",
    checkAuthentication,
    checkPermissions(USER_ROLES.admin),
    validate(checkSchema(UserValidator.destroy)),
    UserController.destroy
  );

  /* Returns a list of skill objects for the specified user ID */
  route.get(
    "/:userId/skills",
    checkAuthentication,
    validate(checkSchema(UserValidator.getSkillsById)),
    UserController.getSkillsById
  );

  /* Add a skills for the specified user ID */
  route.post(
    "/:userId/skills/:skillId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(UserValidator.addSkillById)),
    UserController.addSkillById
  );

  /* Add a skills for the specified user ID */
  route.delete(
    "/:userId/skills/:skillId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(UserValidator.removeSkillById)),
    UserController.removeSkillById
  );

  /* Add a skills for the specified user ID */
  route.post(
    "/:userId/skills/:skillId/certificate",
    checkAuthentication,
    validate(checkSchema(UserValidator.generateCertificate)),
    UserController.generateCertificate
  );

  /* Returns a list of payment objects for the specified user ID */
  route.get(
    "/:userId/payments",
    checkAuthentication,
    validate(checkSchema(UserValidator.getPaymentsById)),
    UserController.getPaymentsById
  );
};
