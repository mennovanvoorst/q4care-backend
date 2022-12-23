import { Schema } from "express-validator";

const download: Schema = {
  fileId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "File id is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "Id is not valid",
      },
    },
  },
};

const destroy: Schema = {
  fileId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "File id is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "Id is not valid",
      },
    },
  },
};

export default {
  download,
  destroy,
};
