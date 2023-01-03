import { Schema } from "express-validator";

const loginToken: Schema = {
  email: {
    in: "body",
    trim: {
      options: [" "],
    },
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Email is required",
      },
    },
    isString: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Email must be a string",
      },
    },
    isEmail: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Email is not a valid email address",
      },
    },
  },
};

const loginTokenVerify: Schema = {
  token: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Token is required",
      },
    },
    isString: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Token must be a string",
      },
    },
    isJWT: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Email is not a valid token",
      },
    },
  },
};

export default {
  loginToken,
  loginTokenVerify,
};
