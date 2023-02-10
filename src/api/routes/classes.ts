import { Router } from "express";
import ClassController from "@controllers/classes";
import checkAuthentication from "@middlewares/checkAuthentication";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import ClassValidator from "../validators/class";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/classes", route);

  /* Returns a list of class objects */
  route.get(
    "/",
    validate(checkSchema(ClassValidator.list)),
    ClassController.list
  );

  /* Create a new class object */
  route.post(
    "/",
    checkAuthentication,
    validate(checkSchema(ClassValidator.create)),
    ClassController.create
  );

  /* Returns the class object for the given id */
  route.get(
    "/:classId",
    validate(checkSchema(ClassValidator.getById)),
    ClassController.getById
  );

  /* Modify a class */
  route.patch(
    "/:classId",
    checkAuthentication,
    validate(checkSchema(ClassValidator.update)),
    ClassController.updateById
  );

  /* Delete the class permanently */
  route.delete(
    "/:classId",
    checkAuthentication,
    validate(checkSchema(ClassValidator.destroy)),
    ClassController.destroy
  );

  /* Returns the class object for the given id */
  route.get(
    "/:classId/students",
    validate(checkSchema(ClassValidator.getStudentsById)),
    ClassController.getStudentsById
  );

  /* Add a student to the specified class ID */
  route.post(
    "/:classId/students",
    checkAuthentication,
    validate(checkSchema(ClassValidator.addStudentById)),
    ClassController.addStudentById
  );

  /* Remove a student from the specified class ID */
  route.delete(
    "/:classId/students",
    checkAuthentication,
    validate(checkSchema(ClassValidator.removeStudentById)),
    ClassController.removeStudentById
  );
};
