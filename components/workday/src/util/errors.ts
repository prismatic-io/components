import type { HttpErrorLike } from "../types";

const decodeErrorBody = (data: unknown): unknown => {
  const bytes = Buffer.isBuffer(data)
    ? data
    : data instanceof ArrayBuffer
      ? Buffer.from(data)
      : undefined;
  if (!bytes) {
    return data;
  }
  const text = bytes.toString("utf8");
  try {
    return JSON.parse(text);
  } catch (_error) {
    return text;
  }
};

const getWorkdayErrorText = (data: unknown): string | undefined => {
  if (typeof data === "string") {
    return data.trim() || undefined;
  }
  if (!data || typeof data !== "object") {
    return undefined;
  }
  const { error, errors } = data as { error?: unknown; errors?: unknown };
  const details = Array.isArray(errors)
    ? errors
        .map((entry) =>
          entry && typeof entry === "object"
            ? (entry as { error?: unknown }).error
            : entry,
        )
        .filter((entry): entry is string => typeof entry === "string")
    : [];
  return (
    [typeof error === "string" ? error : undefined, ...details]
      .filter(Boolean)
      .join("; ") || undefined
  );
};

export const handleWorkdayErrors = (error: unknown): unknown => {
  const httpError = error as HttpErrorLike;
  if (!httpError?.isAxiosError) {
    return error;
  }
  const status = httpError.response?.status;
  const data = decodeErrorBody(httpError.response?.data);
  const detail = getWorkdayErrorText(data);
  return {
    message: detail
      ? `${httpError.message}: ${detail}`
      : (httpError.message ?? "Workday request failed"),
    status,
    data,
  };
};
