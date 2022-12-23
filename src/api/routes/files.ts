import { Router } from "express";
import FileController from "@controllers/files";
import checkAuthentication from "@middlewares/checkAuthentication";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import FileValidator from "../validators/file";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/files", route);

  /* Download a file */
  route.post(
    "/:fileId",
    checkAuthentication,
    validate(checkSchema(FileValidator.download)),
    FileController.download
  );

  /* Delete a file of the class permanently */
  route.delete(
    "/:fileId",
    checkAuthentication,
    validate(checkSchema(FileValidator.destroy)),
    FileController.destroy
  );
};
