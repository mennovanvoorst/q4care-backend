import { Error } from "@interfaces/error";

const checkPermissions =
  (requiredLevel: number) =>
  (req, res, next): void => {
    const { user } = req;

    // eslint-disable-next-line no-bitwise
    if (typeof window === "undefined" || (user && user.flags & requiredLevel))
      return next();

    return res.status(403).json({
      code: "INSUFFICIENT_PERMISSIONS",
      message: "You do not have permission to perform this action",
    } as Error);
  };

export default checkPermissions;
