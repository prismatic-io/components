import { util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import {
  GOOGLE_ADS_ERROR_GUIDANCE,
  GOOGLE_ADS_MAX_RETRIES,
  GOOGLE_ADS_RETRY_BASE_DELAY_MS,
  GOOGLE_ADS_RETRY_MAX_JITTER_MS,
  READ_REQUEST_PATH_SUFFIXES,
  RETRYABLE_READ_ERROR_CODES,
  RETRYABLE_WRITE_ERROR_CODES,
} from "../constants";
import type {
  GoogleAdsErrorBody,
  GoogleAdsErrorDetail,
  GoogleAdsErrorEntry,
  GoogleAdsHttpError,
  HandledHttpError,
} from "../types";

const asErrorBody = (body: unknown): GoogleAdsErrorBody => {
  const unwrapped = Array.isArray(body) ? body[0] : body;
  return unwrapped === undefined ||
    unwrapped === null ||
    util.types.isString(unwrapped)
    ? {}
    : (unwrapped as GoogleAdsErrorBody);
};

const errorDetails = (body: unknown): GoogleAdsErrorDetail[] => {
  const { error, details } = asErrorBody(body);
  const found = error?.details ?? details;
  return Array.isArray(found) ? found : [];
};

const extractGoogleAdsErrors = (body: unknown): GoogleAdsErrorEntry[] =>
  errorDetails(body).flatMap((detail) =>
    Array.isArray(detail.errors) ? detail.errors : [],
  );

const describeFieldViolations = (body: unknown): string =>
  errorDetails(body)
    .flatMap((detail) =>
      Array.isArray(detail.fieldViolations) ? detail.fieldViolations : [],
    )
    .map(({ field, description }) =>
      [util.types.toString(field), util.types.toString(description)]
        .filter((part) => part !== "")
        .join(": "),
    )
    .filter((violation) => violation !== "")
    .join("; ");

const errorCodes = (entries: GoogleAdsErrorEntry[]): string[] =>
  entries.flatMap((entry) => Object.values(entry.errorCode ?? {}));

const requestIdOf = (headers: unknown, body: unknown): string => {
  const fromHeader = util.types.toString(
    (headers as Record<string, unknown> | undefined)?.["request-id"],
  );
  if (fromHeader !== "") {
    return fromHeader;
  }
  const detail = errorDetails(body).find(
    (item) => item.requestId !== undefined,
  );
  return util.types.toString(detail?.requestId);
};

const isReadRequest = (config: GoogleAdsHttpError["config"]): boolean => {
  if (config === undefined) {
    return false;
  }
  if (util.types.toString(config.method).toLowerCase() === "get") {
    return true;
  }
  const path = util.types.toString(config.url).split("?")[0];
  return READ_REQUEST_PATH_SUFFIXES.some((suffix) => path.endsWith(suffix));
};

const isRetryableGoogleAdsError = (error: GoogleAdsHttpError): boolean => {
  const isRead = isReadRequest(error.config);
  if (error.response === undefined) {
    return isRead;
  }
  const retryable = isRead
    ? RETRYABLE_READ_ERROR_CODES
    : RETRYABLE_WRITE_ERROR_CODES;
  return errorCodes(extractGoogleAdsErrors(error.response.data)).some((code) =>
    retryable.includes(code),
  );
};

export const googleAdsRetryConfig = {
  retries: GOOGLE_ADS_MAX_RETRIES,
  retryDelay: (retryCount: number) =>
    GOOGLE_ADS_RETRY_BASE_DELAY_MS * 2 ** (retryCount - 1) +
    Math.floor(Math.random() * GOOGLE_ADS_RETRY_MAX_JITTER_MS),
  retryCondition: isRetryableGoogleAdsError,
};

const describeEntry = (entry: GoogleAdsErrorEntry): string => {
  const codes = Object.values(entry.errorCode ?? {}).join("/");
  const message = util.types.toString(entry.message);
  return codes === "" ? message : `${codes}: ${message}`;
};

const describeHandledError = ({
  message,
  data,
  headers,
}: HandledHttpError): string => {
  const entries = extractGoogleAdsErrors(data);
  const body = asErrorBody(data);
  const bodyMessage = util.types.toString(body.error?.message ?? body.message);

  const violations = describeFieldViolations(data);

  let description = message;
  if (entries.length > 0) {
    description = entries.map(describeEntry).join("; ");
  } else if (bodyMessage !== "") {
    description = `${message}: ${bodyMessage}`;
  }
  if (entries.length === 0 && violations !== "") {
    description = `${description} ${violations}`;
  }

  const guidance = errorCodes(entries)
    .map((code) => GOOGLE_ADS_ERROR_GUIDANCE[code])
    .find((text) => text !== undefined);
  if (guidance !== undefined) {
    description = `${description}. ${guidance}`;
  }

  const requestId = requestIdOf(headers, data);
  if (requestId !== "") {
    description = `${description} (request-id: ${requestId})`;
  }

  return description;
};

export const describeGoogleAdsError = (error: unknown): string => {
  const handled = handleErrors(error);
  if (handled === error) {
    return error instanceof Error ? error.message : util.types.toString(error);
  }
  return describeHandledError(handled as HandledHttpError);
};

export const handleGoogleAdsErrors = (error: unknown): unknown => {
  const handled = handleErrors(error);
  if (handled === error) {
    return error;
  }
  const handledError = handled as HandledHttpError;
  return { ...handledError, message: describeHandledError(handledError) };
};
