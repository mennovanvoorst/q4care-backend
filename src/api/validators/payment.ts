import { Schema } from "express-validator";

const make: Schema = {
  userId: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "userId is not a valid id",
      },
    },
  },
  productId: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "productId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "productId is not a valid id",
      },
    },
  },
};

const webhook: Schema = {
  id: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "id is required",
      },
    },
    isLength: {
      options: {
        min: 13,
        max: 13,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "id is not a valid id",
      },
    },
  },
};

const list: Schema = {
  limit: {
    in: "params",
    optional: true,
    isInt: {
      options: {
        min: 1,
        max: 20,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "limit should be between 1 and 20",
      },
    },
    toInt: true,
  },
  after: {
    in: "params",
    optional: true,
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "after is not a valid payment id",
      },
    },
  },
};

export default {
  make,
  webhook,
  list,
};
