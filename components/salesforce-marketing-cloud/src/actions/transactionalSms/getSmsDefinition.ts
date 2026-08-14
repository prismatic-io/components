import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { getSmsDefinitionExamplePayload } from "../../examplePayloads";
import { getSmsDefinitionInputs } from "../../inputs";
import { smsDefinitionOutputSchema } from "../../outputSchemas";
export const getSmsDefinition = action({
  examplePayload: getSmsDefinitionExamplePayload,
  display: {
    label: "Get SMS Definition",
    description: "Retrieve a transactional SMS send definition by key.",
  },
  inputs: getSmsDefinitionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: smsDefinitionOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, smsDefinitionKey }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SMS_DEFINITIONS_PATH}/${encodeURIComponent(smsDefinitionKey)}`,
    );
    return { data };
  },
});
