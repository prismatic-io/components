import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { ENDPOINTS, LOOK_BACK_DATE_PATTERN } from "../constants";
import type {
  BambooHRChangesObject,
  BambooHRRecordChange,
  EmployeeChange,
} from "../types";

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
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};

export const resolvePollingRecordChanges = (
  data: BambooHRChangesObject | undefined,
): BambooHRRecordChange[] => {
  if (!data) return [];
  const changes: BambooHRRecordChange[] = [];
  for (const record of data.created ?? []) {
    changes.push({ changeType: "created", record });
  }
  for (const record of data.updated ?? []) {
    changes.push({ changeType: "updated", record });
  }
  return changes;
};

export const fetchChangedEmployeesSince = async (
  client: HttpClient,
  since: string,
): Promise<EmployeeChange[]> => {
  const { data } = await client.get(
    `${ENDPOINTS.EMPLOYEES_CHANGED}?since=${encodeURIComponent(since)}`,
  );
  const employees = data?.employees;
  if (!employees || typeof employees !== "object") return [];
  return Object.entries(employees as Record<string, unknown>).map(
    ([id, change]) => {
      const entry = change as {
        action?: string;
        lastChanged?: string;
      } | null;
      return {
        id,
        action: entry?.action as EmployeeChange["action"],
        lastChanged: util.types.toString(entry?.lastChanged),
      };
    },
  );
};

export const partitionChangedEmployees = (
  changes: EmployeeChange[],
): {
  created: EmployeeChange[];
  updated: EmployeeChange[];
} => {
  const created: EmployeeChange[] = [];
  const updated: EmployeeChange[] = [];
  for (const change of changes) {
    if (change.action === "Inserted") created.push(change);
    else updated.push(change);
  }
  return { created, updated };
};
