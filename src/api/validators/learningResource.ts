import { Schema } from "express-validator";

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
        message: "after is not a valid resource id",
      },
    },
  },
};

const create: Schema = {
  title: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Title is required",
      },
    },
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Title is not valid",
      },
    },
  },
  body: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Body is required",
      },
    },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Body is not valid",
      },
    },
  },
  files: {
    in: "body",
  },
};

const getById: Schema = {
  resourceId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Resource id is required",
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

const update: Schema = {
  resourceId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Resource id is required",
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
  title: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Title is required",
      },
    },
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Title is not valid",
      },
    },
  },
  body: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Body is required",
      },
    },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Body is not valid",
      },
    },
  },
  files: {
    in: "body",
  },
};

const destroy: Schema = {
  resourceId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Resource id is required",
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
  list,
  create,
  update,
  getById,
  destroy,
};
