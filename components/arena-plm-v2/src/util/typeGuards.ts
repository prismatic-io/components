import { util } from "@prismatic-io/spectral";
import { toOptionalString } from "./cleanHelpers";
export interface HttpErrorLike {
  message?: string;
  response?: {
    status?: number;
    statusText?: string;
    headers?: Record<string, unknown>;
    data?: unknown;
  };
}
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
export const asHttpError = (error: unknown): HttpErrorLike =>
  isRecord(error) ? error : {};
export const getHttpStatus = (error: unknown): number | undefined => {
  const status = asHttpError(error).response?.status;
  return util.types.isInt(status) ? status : undefined;
};
export const hasHttpStatus = (
  error: unknown,
  statuses: readonly number[],
): boolean => {
  const status = getHttpStatus(error);
  return status !== undefined && statuses.includes(status);
};
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return toOptionalString(asHttpError(error).message) ?? String(error);
};
export const getHttpResponseHeader = (
  error: unknown,
  header: string,
): string | undefined =>
  toOptionalString(asHttpError(error).response?.headers?.[header]);
export const getRecordString = (
  value: unknown,
  key: string,
): string | undefined =>
  isRecord(value) ? toOptionalString(value[key]) : undefined;
export const getRecordStringAny = (
  value: unknown,
  keys: readonly string[],
): string | undefined => {
  for (const key of keys) {
    const found = getRecordString(value, key);
    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
};
interface ArenaErrorData {
  errors?: {
    message?: string;
  }[];
}
export const getArenaErrorMessage = (error: unknown): string => {
  const data = asHttpError(error).response?.data;
  if (isRecord(data)) {
    const firstMessage = toOptionalString(
      (data as ArenaErrorData).errors?.[0]?.message,
    );
    if (firstMessage !== undefined) {
      return firstMessage;
    }
  }
  return getErrorMessage(error);
};
export const getNestedValue = (value: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((current, key) => {
    if (!isRecord(current)) {
      return null;
    }
    return current[key] !== undefined ? current[key] : null;
  }, value);
