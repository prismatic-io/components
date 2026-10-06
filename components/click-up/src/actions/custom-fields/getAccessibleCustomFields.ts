import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getAccessibleCustomFieldsExamplePayload } from "../../examplePayloads";
import { getAccessibleCustomFieldsInputs } from "../../inputs";
import { getAccessibleCustomFieldsOutputSchema } from "../../outputSchemas";
export const getAccessibleCustomFields = action({
  display: {
    label: "Get Accessible Custom Fields",
    description:
      "List the custom fields available on tasks in a specific list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAccessibleCustomFieldsOutputSchema,
  }),
  examplePayload: getAccessibleCustomFieldsExamplePayload,
  performSafety: "safe",
  perform: async (context, { connection, listId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.get(`/list/${listId}/field`);
    return {
      data,
    };
  },
  inputs: getAccessibleCustomFieldsInputs,
});
