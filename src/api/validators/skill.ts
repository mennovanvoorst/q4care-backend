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
        message: "after is not a valid skill id",
      },
    },
  },
};

const create: Schema = {
  name: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Name is required",
      },
    },
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Name is not valid",
      },
    },
  },
};

const getById: Schema = {
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Skill id is required",
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
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Skill id is required",
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
  name: {
    in: "body",
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Name is not valid",
      },
    },
  },
};

const destroy: Schema = {
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "Skill id is required",
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
