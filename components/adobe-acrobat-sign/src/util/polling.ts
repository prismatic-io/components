import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { util } from "@prismatic-io/spectral";
import {
  LOOK_BACK_DATE_PATTERN,
  MAX_POLL_PAGES,
  POLL_OWNERSHIP_SCOPE,
  POLL_PAGE_SIZE,
} from "../constants";
import type {
  AdobeSignAgreementRecord,
  FetchAgreementsResult,
  PartitionedRecords,
  SearchResponse,
} from "../types";
export const MAX_BATCHED_POLL_PAGES = 1;
export async function fetchAgreementsModifiedSince(
  client: HttpClient,
  lastPolledAt: string,
  options?: {
    maxPages?: number;
    resumeStartIndex?: number;
  },
): Promise<
  FetchAgreementsResult & {
    nextStartIndex: number;
  }
> {
  const records: AdobeSignAgreementRecord[] = [];
  const maxPages = options?.maxPages ?? MAX_POLL_PAGES;
  let startIndex = options?.resumeStartIndex ?? 0;
  let pages = 0;
  let truncated = false;
  let exhausted = false;
  while (pages < maxPages) {
    if (startIndex + POLL_PAGE_SIZE >= 10000) {
      truncated = true;
      break;
    }
    const body = {
      scope: ["AGREEMENT_ASSETS"],
      agreementAssetsCriteria: {
        modifiedDate: {
          range: {
            min: lastPolledAt,
          },
        },
        pageSize: POLL_PAGE_SIZE,
        startIndex,
        sortByField: "MODIFIED_DATE",
        sortOrder: "ASC",
      },
    };
    const { data } = await client.post<SearchResponse>("/search", body, {
      headers: { "x-ownership-scope": POLL_OWNERSHIP_SCOPE },
    });
    const pageItems =
      data.agreementAssetEvents ??
      data.agreementAssetsResults?.agreementAssetsList ??
      [];
    records.push(...pageItems);
    pages += 1;
    if (pageItems.length < POLL_PAGE_SIZE) {
      exhausted = true;
      break;
    }
    startIndex += POLL_PAGE_SIZE;
  }
  if (!exhausted && !truncated) {
    truncated = true;
  }
  const latestModifiedDate = records.reduce<string | undefined>(
    (acc, record) => {
      const modified = record.modifiedDate;
      if (typeof modified !== "string") return acc;
      if (!acc) return modified;
      return modified > acc ? modified : acc;
    },
    undefined,
  );
  return { records, truncated, latestModifiedDate, nextStartIndex: startIndex };
}
export function partitionAgreementsByTimestamp(
  records: AdobeSignAgreementRecord[],
  sinceDate: Date,
): PartitionedRecords {
  const created: AdobeSignAgreementRecord[] = [];
  const updated: AdobeSignAgreementRecord[] = [];
  for (const record of records) {
    const createdValue = record.createdDate;
    const modifiedValue = record.modifiedDate;
    const createdAtDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const modifiedAtDate =
      typeof modifiedValue === "string" ? new Date(modifiedValue) : null;
    const isNew = createdAtDate !== null && createdAtDate > sinceDate;
    const isUpdated =
      !isNew && modifiedAtDate !== null && modifiedAtDate > sinceDate;
    if (isNew) {
      created.push(record);
    } else if (isUpdated) {
      updated.push(record);
    } else if (createdAtDate === null && modifiedAtDate === null) {
      updated.push(record);
    }
  }
  return { created, updated };
}
export interface AdobeSignChangesObject {
  created: unknown[];
  updated: unknown[];
}
export interface AdobeSignRecordChange {
  changeType: "created" | "updated";
  record: unknown;
}
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
  data: AdobeSignChangesObject | undefined,
): AdobeSignRecordChange[] => {
  if (!data) return [];
  const changes: AdobeSignRecordChange[] = [];
  for (const record of data.created ?? []) {
    changes.push({ changeType: "created", record });
  }
  for (const record of data.updated ?? []) {
    changes.push({ changeType: "updated", record });
  }
  return changes;
};
