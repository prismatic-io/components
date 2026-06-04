import type { drive_v3 } from "@googleapis/drive";
import type { PaginationParams } from "../interfaces";

export async function fetchFiles(
  params: PaginationParams,
): Promise<drive_v3.Schema$FileList> {
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
    const response = await drive.files.list({
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
