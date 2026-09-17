import { util } from "@prismatic-io/spectral";
import type { drive_v3, driveactivity_v2 } from "googleapis";
import {
  BACKFILL_FILE_FIELDS,
  CHANGE_TYPE_FILE,
  CHANGES_PAGE_SIZE,
  DRIVE_CHANGE_KIND,
} from "../constants";
import type { ListChange } from "../types";
import { getDriveQueryParams } from "./query";
export const getQueryDriveActivity = async (
  drive: driveactivity_v2.Driveactivity,
  params: Record<string, unknown>,
  fetchAll: boolean,
): Promise<driveactivity_v2.Schema$QueryDriveActivityResponse> => {
  const { pageToken, ancestorName, filter, itemName, consolidationStrategy } =
    params;
  const strategy = util.types.toString(consolidationStrategy);
  const consolidation = strategy ? { [strategy]: {} } : undefined;
  let drivePageToken: string | undefined;
  const requestBody: Record<string, unknown> = {
    pageToken,
    ancestorName,
    filter,
    itemName,
    consolidationStrategy: consolidation,
  };
  const { data } = await drive.activity.query({ requestBody });
  if (fetchAll) {
    const collected = data.activities ?? [];
    drivePageToken = data.nextPageToken;
    while (drivePageToken) {
      const nextPage = await drive.activity.query({
        requestBody: {
          pageToken: drivePageToken,
          ancestorName,
          consolidationStrategy: consolidation,
          filter,
          itemName,
        } as Record<string, unknown>,
      });
      collected.push(...(nextPage.data.activities ?? []));
      drivePageToken = nextPage.data.nextPageToken;
    }
    if (collected.length) {
      data.activities = collected;
    }
    drivePageToken = undefined;
  }
  return data;
};
export const fetchBackfillPage = async (
  client: drive_v3.Drive,
  params: {
    modifiedAfter: string;
    driveId: string;
    pageToken?: string;
  },
): Promise<{
  changes: ListChange[];
  nextPageToken?: string;
}> => {
  const { data } = await client.files.list({
    q: `modifiedTime > '${params.modifiedAfter}' and trashed = false`,
    pageSize: CHANGES_PAGE_SIZE,
    fields: BACKFILL_FILE_FIELDS,
    orderBy: "modifiedTime",
    ...(params.pageToken ? { pageToken: params.pageToken } : {}),
    ...getDriveQueryParams(params.driveId),
  });
  const changes: ListChange[] = (data.files ?? []).map((file) => ({
    kind: DRIVE_CHANGE_KIND,
    changeType: CHANGE_TYPE_FILE,
    removed: false,
    fileId: file.id,
    time: file.modifiedTime,
    file: {
      kind: file.kind,
      mimeType: file.mimeType,
      id: file.id,
      name: file.name,
    },
  }));
  return {
    changes,
    ...(data.nextPageToken ? { nextPageToken: data.nextPageToken } : {}),
  };
};
export const fetchChangesPage = async (
  client: drive_v3.Drive,
  params: {
    pageToken: string;
    driveId: string;
  },
): Promise<drive_v3.Schema$ChangeList> => {
  const { data } = await client.changes.list({
    pageSize: CHANGES_PAGE_SIZE,
    pageToken: params.pageToken,
    ...getDriveQueryParams(params.driveId),
  });
  return data;
};
export const fetchStartPageToken = async (
  client: drive_v3.Drive,
  driveId: string,
): Promise<string> => {
  const {
    data: { startPageToken },
  } = await client.changes.getStartPageToken(getDriveQueryParams(driveId));
  return startPageToken as string;
};
