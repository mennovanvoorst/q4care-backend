import { Router } from "express";
import SkillController from "@controllers/skills";
import checkAuthentication from "@middlewares/checkAuthentication";
import { checkSchema } from "express-validator";
import validate from "@middlewares/validate";
import checkPermissions from "@middlewares/checkPermissions";
import { USER_ROLES } from "@constants";
import SkillValidator from "../validators/skill";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/skills", route);

  /* Returns a list of skill objects */
  route.get(
    "/",
    validate(checkSchema(SkillValidator.list)),
    SkillController.list
  );

  /* Create a new skill object */
  route.post(
    "/",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(SkillValidator.create)),
    SkillController.create
  );

  /* Returns the skill object for the given id */
  route.get(
    "/:skillId",
    validate(checkSchema(SkillValidator.getById)),
    SkillController.getById
  );

  /* Modify a skill */
  route.patch(
    "/:skillId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(SkillValidator.update)),
    SkillController.updateById
  );

  /* Delete the skill permanently */
  route.delete(
    "/:skillId",
    checkAuthentication,
    checkPermissions(USER_ROLES.teacher),
    validate(checkSchema(SkillValidator.destroy)),
    SkillController.destroy
  );
};
