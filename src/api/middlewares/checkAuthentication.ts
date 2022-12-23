import config from "@config";
import { Error } from "@interfaces/error";

const checkAuthentication = (req, res, next): void => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split("Basic")[1].trim();

  if (req.isAuthenticated() || token === config.serverAuthToken) return next();

  return res.status(401).json({
    code: "INVALID_AUTHENTICATION_CREDENTIALS",
    message: "User is not authenticated",
  } as Error);
};

export default checkAuthentication;
