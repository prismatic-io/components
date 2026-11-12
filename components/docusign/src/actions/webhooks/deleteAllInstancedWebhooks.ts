import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteAllInstancedWebhooksOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteAllInstancedWebhooksInputs } from "../../inputs";
import { deleteAllInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteAllInstancedWebhooks as deleteAllInstancedWebhooksFn } from "../../util";

export const deleteAllInstancedWebhooks = action({
  display: {
    label: "Delete All Instanced Webhooks",
    description: "Delete all webhooks that point to a flow in this instance.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const flowEndpoint = context.webhookUrls[context.flow.name];
    const data = await deleteAllInstancedWebhooksFn(client, flowEndpoint);
    return { data };
  },
  examplePerform: async () => deleteAllInstancedWebhooksExamplePayload,
  inputs: deleteAllInstancedWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAllInstancedWebhooksOutputSchema,
  }),
  examplePayload: deleteAllInstancedWebhooksExamplePayload,
});
