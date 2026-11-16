import {
  EXTERNAL_ID_PREFIX,
  LOCATION_RECORD_PATTERN,
  RECORDS_PAGE_SIZE,
} from "../constants";
import type { FetchAllRecordsParams } from "../types/Record";

export const fetchAllRecords = async ({
  client,
  recordType,
  query,
}: FetchAllRecordsParams): Promise<unknown[]> => {
  const allRecords: unknown[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get(`/${recordType}`, {
      params: {
        q: query,
        limit: RECORDS_PAGE_SIZE,
        offset,
      },
    });

    const records = data?.items || [];
    allRecords.push(...records);

    hasMore = data?.hasMore === true;
    offset += RECORDS_PAGE_SIZE;
  }

  return allRecords;
};

export const parseLocationData = (
  locationHeader: string,
): { recordType: string; id: string } => {
  const locationData = LOCATION_RECORD_PATTERN.exec(locationHeader);
  if (!locationData) {
    throw new Error(
      `Something went wrong when parsing location header ${locationHeader}`,
    );
  }
  const [, recordType, id] = locationData;
  return { recordType, id };
};

export const encodeRecordId = (id: string): string =>
  id.startsWith(EXTERNAL_ID_PREFIX)
    ? `${EXTERNAL_ID_PREFIX}${encodeURIComponent(id.slice(EXTERNAL_ID_PREFIX.length))}`
    : encodeURIComponent(id);
