import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, folderId, includeItems } from "../inputs";

export const listFolderItems = action({
  display: {
    label: "List Folder Items",
    description: "Gets information about items in the specified folder.",
  },
  perform: async (context, { connection, folderId, includeItems }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/folders/${folderId}`, {
      params: { include_items: includeItems },
    });
    return { data };
  },
  inputs: {
    connection,
    folderId,
    includeItems,
  },
});
