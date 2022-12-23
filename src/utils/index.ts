import { Error } from "@interfaces/error";

export const expressErrorHandler = (err, req, res, next) => {
  const response: Error = {
    code: "INTERNAL_ERROR",
    message:
      "The server encountered an internal error. Please retry the request.",
  };

  return res.status(500).send(response);
};

export const generateId = (length: number = 19) =>
  Math.floor(
    10 ** (length - 1) + Math.random() * (10 ** length - 10 ** (length - 1) - 1)
  ).toString();
