import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getTabularFieldsExamplePayload } from "../../examplePayloads";
import { getTabularFieldsInputs } from "../../inputs";
import { getTabularFieldsOutputSchema } from "../../outputSchemas";

export const getTabularFields = action({
  display: {
    label: "List Tabular Fields",
    description: "List all tables and their fields in the account.",
  },
  inputs: getTabularFieldsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTabularFieldsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/v1/meta/tables");
    return { data };
  },
  examplePerform: async () => getTabularFieldsExamplePayload,
  examplePayload: getTabularFieldsExamplePayload,
});
