import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { paginateResults } from "../helpers/pagination";
import { connection, fetchAll, folderId, includeItems } from "../inputs";

export const listFolderItems = action({
  display: {
    label: "List Folder Items",
    description: "Gets information about items in the specified folder.",
  },
  perform: async (
    context,
    { connection, folderId, fetchAll, includeItems },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    return await paginateResults({
      client,
      endpoint: `/folders/${folderId}`,
      params: { include_items: includeItems },
      fetchAll,
      itemsKey: "folderItems",
    });
  },
  inputs: {
    connection,
    folderId,
    fetchAll,
    includeItems,
  },
});
