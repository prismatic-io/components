import { action, outputSchema } from "@prismatic-io/spectral";
import { updateWebhookOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookExamplePayload } from "../../examplePayloads";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/connect`, jsonInput);
    return { data };
  },
  examplePerform: async () => updateWebhookExamplePayload,
  inputs: updateWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookOutputSchema,
  }),
  examplePayload: updateWebhookExamplePayload,
});
