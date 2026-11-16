import { util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import {
  MAX_RETRIES,
  RATE_LIMIT_STATUS,
  RETRY_BASE_DELAY_MS,
  RETRY_MAX_JITTER_MS,
} from "../constants";
import type {
  HandledHttpError,
  NetSuiteErrorBody,
  RetryableHttpError,
} from "../types";

export const netSuiteRetryConfig = {
  retries: MAX_RETRIES,
  retryDelay: (retryCount: number): number =>
    RETRY_BASE_DELAY_MS * 2 ** (retryCount - 1) +
    Math.floor(Math.random() * RETRY_MAX_JITTER_MS),
  retryCondition: (error: RetryableHttpError): boolean =>
    error.response?.status === RATE_LIMIT_STATUS,
};

const describeErrorDetails = (body: unknown): string => {
  const details =
    body !== null && typeof body === "object"
      ? (body as NetSuiteErrorBody)["o:errorDetails"]
      : undefined;
  if (!Array.isArray(details)) {
    return "";
  }
  return details
    .map((entry) =>
      [
        util.types.toString(entry["o:errorCode"]),
        util.types.toString(entry.detail),
      ]
        .filter((part) => part !== "")
        .join(": "),
    )
    .filter((description) => description !== "")
    .join("; ");
};

export const handleNetSuiteErrors = (error: unknown): unknown => {
  const handled = handleErrors(error);
  if (handled === error) {
    return error;
  }
  const handledError = handled as HandledHttpError;
  const details = describeErrorDetails(handledError.data);
  return details === ""
    ? handledError
    : { ...handledError, message: `${handledError.message}: ${details}` };
};
