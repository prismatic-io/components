import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN, RECORDS_PAGE_SIZE } from "../constants";
export const toNumberWithDefault1000 = (value: unknown): number =>
  util.types.toNumber(value, RECORDS_PAGE_SIZE);
export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (
    !LOOK_BACK_DATE_PATTERN.test(raw) ||
    Number.isNaN(parsed.getTime()) ||
    !parsed.toISOString().startsWith(raw)
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
