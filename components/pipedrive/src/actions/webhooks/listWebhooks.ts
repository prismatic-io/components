import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooks as listWebhooksFn } from "../../util";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksOutputSchema } from "../../outputSchemas";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await listWebhooksFn(client);
    return { data };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
  examplePerform: async () => listWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
});
