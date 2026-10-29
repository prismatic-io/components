import { util } from "@prismatic-io/spectral";
import type { createAlgoliaClient } from "./client";
import { LOOK_BACK_DATE_PATTERN } from "./constants";
import type {
  AlgoliaChangesObject,
  AlgoliaIndex,
  AlgoliaRecordChange,
} from "./types";

export const fetchAllIndices = async (
  client: ReturnType<typeof createAlgoliaClient>,
): Promise<AlgoliaIndex[]> => {
  const allIndices: AlgoliaIndex[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get("/1/indexes", {
      params: { page },
    });
    const items = (data.items ?? []) as AlgoliaIndex[];
    allIndices.push(...items);
    page++;
    hasMore = page < (data.nbPages ?? 0);
  }

  return allIndices;
};

export const resolvePollingRecordChanges = (
  data: AlgoliaChangesObject | undefined,
): AlgoliaRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): AlgoliaRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): AlgoliaRecordChange => ({ changeType: "updated", record }),
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
