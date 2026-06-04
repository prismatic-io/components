import type { drive_v3 } from "googleapis";
import type { GaxiosResponse } from "gaxios";
import type { PaginationParams, DrivesPaginationParams } from "../interfaces";

export async function fetchFiles(params: PaginationParams): Promise<drive_v3.Schema$FileList> {
  const { drive, initialParams, fetchAll } = params;

  if (!fetchAll) {
    const { data } = await drive.files.list(initialParams);
    return data;
  }

  const allFiles: drive_v3.Schema$File[] = [];
  let nextPageToken: string | undefined;

  const paginationParams = {
    ...initialParams,
    pageToken: undefined,
    pageSize: undefined,
  };

  do {
    const response: GaxiosResponse<drive_v3.Schema$FileList> = await drive.files.list({
      ...paginationParams,
      pageToken: nextPageToken,
    });

    if (response.data.files) {
      allFiles.push(...response.data.files);
    }

    nextPageToken = response.data.nextPageToken || undefined;
  } while (nextPageToken);

  return {
    files: allFiles,
  };
}

export async function fetchDrives(
  params: DrivesPaginationParams,
): Promise<drive_v3.Schema$DriveList> {
  const { drive, initialParams, fetchAll } = params;

  if (!fetchAll) {
    const { data } = await drive.drives.list(initialParams);
    return data;
  }

  const allDrives: drive_v3.Schema$Drive[] = [];
  let nextPageToken: string | undefined;

  const paginationParams = {
    ...initialParams,
    pageToken: undefined,
    pageSize: undefined,
  };

  do {
    const response: GaxiosResponse<drive_v3.Schema$DriveList> = await drive.drives.list({
      ...paginationParams,
      pageToken: nextPageToken,
    });

    if (response.data.drives) {
      allDrives.push(...response.data.drives);
    }

    nextPageToken = response.data.nextPageToken || undefined;
  } while (nextPageToken);

  return {
    drives: allDrives,
  };
}
