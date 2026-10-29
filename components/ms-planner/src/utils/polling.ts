import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import type { PlannerChangesObject, PlannerTaskChange } from "../types";
export const resolvePlannerTaskChanges = (
  data: PlannerChangesObject | undefined,
): PlannerTaskChange[] => {
  const changesObject = data ?? { created: [] };
  return (changesObject.created ?? []).map(
    (record): PlannerTaskChange => ({ changeType: "created", record }),
  );
};
export const newestCreatedDateTime = (
  tasks: {
    createdDateTime?: string | null;
  }[],
): string | undefined => {
  let newest: number | undefined;
  for (const { createdDateTime } of tasks) {
    if (!createdDateTime) continue;
    const created = Date.parse(createdDateTime);
    if (!Number.isNaN(created) && (newest === undefined || created > newest))
      newest = created;
  }
  return newest === undefined ? undefined : new Date(newest).toISOString();
};
export const latestCreatedDateTime = (
  tasks: {
    createdDateTime?: string | null;
  }[],
  current: string,
): string => {
  const newest = newestCreatedDateTime(tasks);
  const currentDate = new Date(current);
  return newest && new Date(newest) > currentDate
    ? newest
    : currentDate.toISOString();
};
export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";
  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};
