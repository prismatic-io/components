import { util } from "@prismatic-io/spectral";
import type { MetricIntakeType } from "../types";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const toRequiredNumber =
  (label: string): ((value: unknown) => number) =>
  (value: unknown): number => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      throw new Error(`${label} is required and must be a number.`);
    }
    return util.types.toNumber(value);
  };
export const toMetricSeries = (value: unknown): unknown[] => {
  const series = util.types.toObject(value);
  if (!Array.isArray(series)) {
    throw new Error("Metric Series must be a JSON array of metric series.");
  }
  return series;
};
export const toOptionalMetricIntakeType = (
  value: unknown,
): MetricIntakeType | undefined =>
  value ? (util.types.toNumber(value) as MetricIntakeType) : undefined;
export const toStringList = (value: unknown): string[] => value as string[];
