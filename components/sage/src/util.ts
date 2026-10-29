import { util } from "@prismatic-io/spectral";
import type { getSageClient } from "./client";
import { LOOK_BACK_DATE_PATTERN } from "./constants";
import type { SageChangesObject, SageRecord, SageRecordChange } from "./types";

export const fetchAllSince = async (
  client: ReturnType<typeof getSageClient>,
  endpoint: string,
  updatedSince: string,
): Promise<SageRecord[]> => {
  const allRecords: SageRecord[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get(endpoint, {
      params: {
        updated_or_created_since: updatedSince,
        items_per_page: 200,
        page,
      },
    });
    const items = (data?.$items ?? data ?? []) as SageRecord[];
    if (Array.isArray(items)) {
      allRecords.push(...items);
      hasMore = items.length >= 200;
    } else {
      hasMore = false;
    }
    page++;
  }

  return allRecords;
};

export const resolvePollingRecordChanges = (
  data: SageChangesObject | undefined,
): SageRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): SageRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): SageRecordChange => ({ changeType: "updated", record }),
    ),
  ];
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
