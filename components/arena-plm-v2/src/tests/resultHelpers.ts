import { getRecordString, isRecord } from "../util";
export const resultData = (result: unknown): Record<string, unknown> => {
  const data = isRecord(result) ? result.data : undefined;
  return isRecord(data) ? data : {};
};
export const resultList = (result: unknown): Record<string, unknown>[] => {
  const { results } = resultData(result);
  return Array.isArray(results) ? results.filter(isRecord) : [];
};
export const guidOf = (entry: unknown): string | undefined =>
  getRecordString(entry, "guid");
export const resultGuid = (result: unknown): string | null =>
  getRecordString(resultData(result), "guid") ?? null;
export const firstResultGuid = (result: unknown): string | null =>
  getRecordString(resultList(result)[0], "guid") ?? null;
export const dataSourceResultList = (
  result: unknown,
): Record<string, unknown>[] => {
  const entries = isRecord(result) ? result.result : undefined;
  return Array.isArray(entries) ? entries.filter(isRecord) : [];
};
