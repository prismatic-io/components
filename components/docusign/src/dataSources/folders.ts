import { dataSource } from "@prismatic-io/spectral";
import { foldersInputs } from "../inputs";

import { getFolders } from "../util";
import { getDocuSignClient } from "../client";
import { foldersExamplePayload } from "../examplePayloads";

export const folders = dataSource({
  display: {
    label: "Select Folder",
    description: "A picklist of folders in the DocuSign account.",
  },
  inputs: foldersInputs,
  perform: async (
    context,
    {
      connection,
      count,
      include,
      includeItems,
      startPosition,
      subFolderDepth,
      userFilter,
    },
  ) => {
    const client = await getDocuSignClient(connection);
    const data = await getFolders(
      client,
      count,
      include,
      includeItems,
      startPosition,
      subFolderDepth,
      userFilter,
    );

    return {
      result: data.folders.map(
        (folder: { name: string; folderId: string }) => ({
          key: folder.folderId,
          label: folder.name,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: foldersExamplePayload,
});
