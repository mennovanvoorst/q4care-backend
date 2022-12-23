import { Router } from "express";
import ResourceController from "@controllers/learningResources";
import checkAuthentication from "@middlewares/checkAuthentication";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import multer from "multer";
import checkPermissions from "@middlewares/checkPermissions";
import { USER_ROLES } from "@constants";
import ResourceValidator from "../validators/learningResource";

const upload = multer();

const route = Router();

export default (app: Router): void => {
  app.use("/v1/resources", route);

  /* Returns a list of class objects */
  route.get(
    "/",
    validate(checkSchema(ResourceValidator.list)),
    ResourceController.list
  );

  /* Create a new class object */
  route.post(
    "/",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    upload.array("files"),
    validate(checkSchema(ResourceValidator.create)),
    ResourceController.create
  );

  /* Returns the class object for the given id */
  route.get(
    "/:resourceId",
    validate(checkSchema(ResourceValidator.getById)),
    ResourceController.getById
  );

  /* Modify a class */
  route.patch(
    "/:resourceId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    upload.array("files"),
    validate(checkSchema(ResourceValidator.update)),
    ResourceController.updateById
  );

  /* Delete the class permanently */
  route.delete(
    "/:resourceId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    checkAuthentication,
    validate(checkSchema(ResourceValidator.destroy)),
    ResourceController.destroy
  );
};
