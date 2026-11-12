import { action, outputSchema } from "@prismatic-io/spectral";
import { listFolderItemsOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { paginateResults } from "../../util";
import { listFolderItemsInputs } from "../../inputs";
import { listFolderItemsExamplePayload } from "../../examplePayloads";

export const listFolderItems = action({
  display: {
    label: "List Folder Items",
    description: "Gets information about items in the specified folder.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => listFolderItemsExamplePayload,
  inputs: listFolderItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFolderItemsOutputSchema,
  }),
  examplePayload: listFolderItemsExamplePayload,
});
