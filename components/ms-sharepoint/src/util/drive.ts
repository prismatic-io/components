import type { HttpClient } from "@prismatic-io/spectral/http";
import type { DriveItem, DriveResponse } from "../types";

export const getFilesFromDriveFN = async (
  client: HttpClient,
  driveId: string,
  drives: DriveItem[] = [],
): Promise<DriveResponse> => {
  const allFiles: DriveItem[] = [];
  let rootContext: string | undefined;

  const processFolder = async (folderId: string): Promise<DriveItem[]> => {
    const folderFiles: DriveItem[] = [];
    let nextLink: string | undefined;

    do {
      const endpoint =
        folderId === "root"
          ? `/drives/${driveId}/root/children`
          : `/drives/${driveId}/items/${folderId}/children`;

      const { data } = await client.get<DriveResponse>(nextLink || endpoint);

      if (folderId === "root" && !rootContext) {
        rootContext = data["@odata.context"];
      }

      const folders: DriveItem[] = [];

      for (const item of data.value) {
        if (item.folder) {
          folders.push(item);
        } else {
          folderFiles.push(item);
        }
      }

      if (folders.length > 0) {
        const subFolderResults = await Promise.all(
          folders.map((folder) => processFolder(folder.id)),
        );
        folderFiles.push(...subFolderResults.flat());
      }

      nextLink = data["@odata.nextLink"];
    } while (nextLink);

    return folderFiles;
  };

  if (drives.length > 0) {
    const driveResults = await Promise.all(
      drives.map(async (drive) => {
        if (drive.folder) {
          return processFolder(drive.id);
        }
        return [drive];
      }),
    );
    allFiles.push(...driveResults.flat());
  } else {
    const rootFiles = await processFolder("root");
    allFiles.push(...rootFiles);
  }

  return {
    value: allFiles,
    ...(rootContext ? { "@odata.context": rootContext } : {}),
  };
};
