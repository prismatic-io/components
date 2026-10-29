import { RECORDS_PAGE_SIZE } from "../constants";
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

export const parseLocationData = (locationHeader: string) => {
  const idRegex = /\/services\/rest\/record\/v1\/(\w*)\/(\d*)/;
  const locationData = idRegex.exec(locationHeader);
  if (locationData?.length !== 3) {
    throw new Error(
      `Something went wrong when parsing location header ${locationHeader}`,
    );
  }
  const [, recordType, id] = locationData;
  return { recordType, id };
};
