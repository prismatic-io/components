import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteInstancedWebhooksOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { deleteInstancedWebhooksInputs } from "../../inputs";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteWebhookInstance } from "../../util";
export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Delete all webhooks that point to a flow in this instance.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organization, scope, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const endpoint = context.webhookUrls[context.flow.name];
    return {
      data: await deleteWebhookInstance(
        client,
        endpoint,
        organization,
        user,
        scope,
      ),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteInstancedWebhooksExamplePayload.data,
  }),
  inputs: deleteInstancedWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstancedWebhooksOutputSchema,
  }),
  examplePayload: deleteInstancedWebhooksExamplePayload,
});
