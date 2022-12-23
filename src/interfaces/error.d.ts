export type ErrorCodes =
  | "MISSING_FIELD"
  | "MISSING_QUERY"
  | "INVALID_ARGUMENT"
  | "INVALID_PARAMETER"
  | "UNSUPPORTED_FIELD"
  | "UNSUPPORTED_QUERY"
  | "NOT_AUTHENTICATION_CREDENTIALS"
  | "INVALID_AUTHENTICATION_CREDENTIALS"
  | "INSUFFICIENT_PERMISSIONS"
  | "RESOURCE_NOT_FOUND"
  | "INTERNAL_ERROR";

export interface Error {
  code: ErrorCodes;
  message?: string;
  errors?: Record<string, { code: ErrorCodes; message: string }>;
}
