import { action, outputSchema } from "@prismatic-io/spectral";
import { listFoldersOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { paginateResults } from "../../util";
import { listFoldersInputs } from "../../inputs";
import { listFoldersExamplePayload } from "../../examplePayloads";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Returns a list of the account's folders.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination,
      include,
      includeItems,
      subFolderDepth,
      userFilter,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    return await paginateResults({
      client,
      endpoint: "/folders",
      params: {
        include: include || undefined,
        include_items: includeItems,
        sub_folder_depth: subFolderDepth || undefined,
        user_filter: userFilter || undefined,
      },
      fetchAll,
      count: pagination?.count,
      startPosition: pagination?.startPosition,
      itemsKey: "folders",
    });
  },
  examplePerform: async () => listFoldersExamplePayload,
  inputs: listFoldersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFoldersOutputSchema,
  }),
  examplePayload: listFoldersExamplePayload,
});
