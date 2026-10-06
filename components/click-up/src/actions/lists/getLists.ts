import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListsExamplePayload } from "../../examplePayloads";
import { getListsInputs } from "../../inputs";
import { getListsOutputSchema } from "../../outputSchemas";
export const getLists = action({
  display: {
    label: "List Lists in Folder",
    description: "List the lists within a folder.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListsOutputSchema,
  }),
  examplePayload: getListsExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, folderId, archived }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const queryParams = { archived };
    const { data } = await client.get(`/folder/${folderId}/list`, {
      params: queryParams,
    });
    return {
      data,
    };
  },
  inputs: getListsInputs,
});
