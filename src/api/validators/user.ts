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
        message: "after is not a valid user id",
      },
    },
  },
};

const getById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
};

const updateCurrentById: Schema = {
  email: {
    in: "body",
    optional: true,
    isEmail: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Email is not a valid email address",
      },
    },
  },
};

const updateById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "User id is required",
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
  email: {
    in: "body",
    optional: true,
    trim: {
      options: [" "],
    },
    isEmail: {
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Email is not a valid email address",
      },
    },
  },
  firstName: {
    in: "body",
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "First name is not valid",
      },
    },
  },
  lastName: {
    in: "body",
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Last name is not valid",
      },
    },
  },
  flags: {
    in: "body",
    optional: true,
    isInt: {
      options: {
        min: 0,
        max: 30,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Flags is not valid",
      },
    },
  },
};

const getSkillsById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
};

const addSkillById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "skillId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "skillId is not a valid id",
      },
    },
  },
  achievementDate: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "achievementDate is required",
      },
    },
    isISO8601: {
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "achievementDate is not a valid date",
      },
    },
  },
};

const removeSkillById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "skillId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "skillId is not a valid id",
      },
    },
  },
};

const generateCertificate: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
  skillId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "skillId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "skillId is not a valid id",
      },
    },
  },
};

const create: Schema = {
  firstName: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "First name is required",
      },
    },
  },
  lastName: {
    in: "body",
    exists: {
      errorMessage: {
        code: "MISSING_FIELD",
        message: "Last name is required",
      },
    },
  },
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
  flags: {
    in: "body",
    optional: true,
    isInt: {
      options: {
        min: 0,
        max: 30,
      },
      errorMessage: {
        code: "INVALID_ARGUMENT",
        message: "Flags is not valid",
      },
    },
  },
};

const getPaymentsById: Schema = {
  userId: {
    in: "params",
    exists: {
      errorMessage: {
        code: "MISSING_QUERY",
        message: "userId is required",
      },
    },
    isLength: {
      options: {
        min: 19,
        max: 19,
      },
      errorMessage: {
        code: "INVALID_PARAMETER",
        message: "userId is not a valid id",
      },
    },
  },
};

export default {
  create,
  list,
  getById,
  updateById,
  getSkillsById,
  addSkillById,
  removeSkillById,
  generateCertificate,
  updateCurrentById,
  getPaymentsById,
};
