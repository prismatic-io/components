import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
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













export async function fetchAgreementsModifiedSince(
  client: HttpClient,
  lastPolledAt: string,
): Promise<FetchAgreementsResult> {
  const records: AdobeSignAgreementRecord[] = [];
  let startIndex = 0;
  let pages = 0;
  let truncated = false;

  while (pages < MAX_POLL_PAGES) {
    
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
      break;
    }

    startIndex += POLL_PAGE_SIZE;
  }

  
  
  
  if (pages >= MAX_POLL_PAGES && !truncated) {
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

  return { records, truncated, latestModifiedDate };
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
