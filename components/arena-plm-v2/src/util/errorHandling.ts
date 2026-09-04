import type { ActionLogger } from "@prismatic-io/spectral";
import { ARENA_CREDENTIAL_REJECTION_STATUSES } from "../constants";
export function isSessionExpiredError(error: unknown): boolean {
  const httpError = error as AuthErrorShape | null | undefined;
  if (httpError?.response?.status !== 401) {
    return false;
  }
  const errorMessage =
    httpError.response?.data?.errors?.[0]?.message?.toLowerCase() ||
    httpError.response?.data?.error?.toLowerCase() ||
    "";
  const permissionErrorKeywords = [
    "permission",
    "access denied",
    "forbidden",
    "not authorized to",
    "not permitted",
    "not allowed",
    "insufficient",
  ];
  if (permissionErrorKeywords.some((k) => errorMessage.includes(k))) {
    return false;
  }
  return true;
}
interface AuthErrorShape {
  response?: {
    status?: number;
    data?: {
      errors?: {
        message?: string;
      }[];
      error?: string;
      error_description?: string;
    };
  };
  message?: string;
}
export const isCredentialRejection = (error: unknown): boolean => {
  const status = (error as AuthErrorShape)?.response?.status;
  return (
    status !== undefined && ARENA_CREDENTIAL_REJECTION_STATUSES.includes(status)
  );
};
export const parseAuthErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  const authError = error as AuthErrorShape;
  return (
    authError?.response?.data?.errors?.[0]?.message ??
    authError?.response?.data?.error_description ??
    authError?.response?.data?.error ??
    authError?.message ??
    fallback
  );
};
const arenaErrorMessages = (responseData: unknown): string[] => {
  if (!responseData || typeof responseData !== "object") {
    return [];
  }
  const { errors } = responseData as {
    errors?: unknown;
  };
  if (!Array.isArray(errors)) {
    return [];
  }
  return errors.flatMap((entry) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }
    const { message } = entry as {
      message?: unknown;
    };
    return typeof message === "string" && message.trim() !== ""
      ? [message]
      : [];
  });
};
export const handleArenaError = (
  error: unknown,
  logger: ActionLogger,
  actionName: string,
): never => {
  let errorMessage = "An unknown error occurred";
  let statusCode: number | undefined;
  let responseData: unknown;
  if (error && typeof error === "object" && "response" in error) {
    const httpError = error as {
      response?: {
        status?: number;
        data?: unknown;
        statusText?: string;
      };
      message?: string;
    };
    statusCode = httpError.response?.status;
    responseData = httpError.response?.data;
    errorMessage =
      httpError.message ||
      httpError.response?.statusText ||
      "HTTP request failed";
    if (statusCode === 400) {
      errorMessage =
        "Bad Request - Invalid request data or missing required fields";
    } else if (statusCode === 417) {
      errorMessage = "Expectation Failed - Arena-specific validation failure";
    } else if (statusCode === 401) {
      errorMessage = "Unauthorized - Invalid API key or session expired";
    } else if (statusCode === 403) {
      errorMessage = "Forbidden - Insufficient permissions for this operation";
    } else if (statusCode === 404) {
      errorMessage = "Not Found - The requested resource does not exist";
    } else if (statusCode === 429) {
      errorMessage = "Rate Limited - Too many requests, please try again later";
    } else if (statusCode && statusCode >= 500) {
      errorMessage = "Server Error - Arena API is experiencing issues";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  const detail = arenaErrorMessages(responseData);
  logger.error(`${actionName} Error: ${errorMessage}`, {
    stack: error instanceof Error ? error.stack : undefined,
    statusCode,
    arenaMessages: detail,
  });
  const formattedMessage = `Failed to ${actionName.toLowerCase()}${statusCode ? ` (Status ${statusCode})` : ""}: ${errorMessage}${detail.length > 0 ? ` - ${detail.join("; ")}` : ""}`;
  throw new Error(formattedMessage);
};
