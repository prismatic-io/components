import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listFoldersExamplePayload } from "../../examplePayloads";
import { listFoldersInputs } from "../../inputs";
import { listFoldersOutputSchema } from "../../outputSchemas";
export const listFolders = action({
  display: {
    label: "List Folders",
    description: "List all folders in a space.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFoldersOutputSchema,
  }),
  examplePayload: listFoldersExamplePayload,
  performSafety: "safe",
  perform: async (context, { connection, spaceId, archived }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: {
      archived?: unknown;
    } = {};
    if (archived !== undefined) {
      params.archived = archived;
    }
    const { data } = await client.get(`/space/${spaceId}/folder`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listFoldersInputs,
});
