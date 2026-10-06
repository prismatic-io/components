import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListExamplePayload } from "../../examplePayloads";
import { getListInputs } from "../../inputs";
import { getListOutputSchema } from "../../outputSchemas";
export const getList = action({
  display: {
    label: "Get List",
    description: "Retrieve details for a specific list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListOutputSchema,
  }),
  examplePayload: getListExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/list/${listId}`);
    return {
      data,
    };
  },
  inputs: getListInputs,
});
