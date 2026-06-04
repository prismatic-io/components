import { dataSource } from "@prismatic-io/spectral";
import {
  connection,
  count,
  include,
  includeItems,
  startPosition,
  subFolderDepth,
  userFilter,
} from "../inputs";

import { getFolders } from "../utils";
import { getDocuSignClient } from "../client";

export const folders = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a Folder.",
  },
  inputs: {
    connection,
    count,
    include,
    includeItems,
    startPosition,
    subFolderDepth,
    userFilter,
  },
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
});
