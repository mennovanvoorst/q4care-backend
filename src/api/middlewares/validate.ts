import { Error } from "@interfaces/error";
import { validationResult } from "express-validator";

const checkIfExtraFields = (validator, req) => {
  const validationFields = validator
    .reduce((fields, rule) => [...fields, ...rule.builder.fields], [])
    .sort();
  const requestInput = { ...req.query, ...req.params, ...req.body };
  const requestFields = Object.keys(requestInput).sort();

  if (requestFields.filter((x) => !validationFields.includes(x)).length === 0) {
    return false;
  }

  return true;
};

const validate =
  (validator, allowExtraFields = false) =>
  async (req, res, next) => {
    if (!allowExtraFields) {
      const extraFields = checkIfExtraFields(validator, req);

      if (extraFields) {
        return res.status(400).json({
          code: "UNSUPPORTED_FIELD",
          message: "One of the passed fields is not supported.",
        } as Error);
      }
    }

    const errorFormatter = (err) => err.msg;

    await validator.run(req);
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      const errorObject = errors.mapped();

      return res.status(400).json({
        code: "INVALID_ARGUMENT",
        errors: errorObject,
      } as Error);
    }

    return next();
  };

export default validate;
