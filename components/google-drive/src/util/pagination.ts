import type { GaxiosResponse } from "gaxios";
import type { drive_v3 } from "googleapis";
import type { PaginationParams } from "../types";
export async function fetchAllPages<
  TResponse extends {
    nextPageToken?: string | null;
  },
  TItem,
>(
  listPage: (pageToken?: string) => Promise<GaxiosResponse<TResponse>>,
  selectItems: (response: TResponse) => TItem[] | undefined,
): Promise<TItem[]> {
  const items: TItem[] = [];
  let nextPageToken: string | undefined;
  do {
    const response = await listPage(nextPageToken);
    const pageItems = selectItems(response.data);
    if (pageItems) {
      items.push(...pageItems);
    }
    nextPageToken = response.data.nextPageToken || undefined;
  } while (nextPageToken);
  return items;
}
export async function fetchFiles(
  params: PaginationParams<drive_v3.Params$Resource$Files$List>,
): Promise<drive_v3.Schema$FileList> {
  const { drive, initialParams, fetchAll } = params;
  if (!fetchAll) {
    const { data } = await drive.files.list(initialParams);
    return data;
  }
  const files = await fetchAllPages(
    (pageToken) =>
      drive.files.list({ ...initialParams, pageSize: undefined, pageToken }),
    (data) => data.files,
  );
  return {
    files,
  };
}
export async function fetchDrives(
  params: PaginationParams<drive_v3.Params$Resource$Drives$List>,
): Promise<drive_v3.Schema$DriveList> {
  const { drive, initialParams, fetchAll } = params;
  if (!fetchAll) {
    const { data } = await drive.drives.list(initialParams);
    return data;
  }
  const drives = await fetchAllPages(
    (pageToken) =>
      drive.drives.list({ ...initialParams, pageSize: undefined, pageToken }),
    (data) => data.drives,
  );
  return {
    drives,
  };
}
