import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteInstancedSubscriptionsExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteInstancedSubscriptionsInputs as inputs } from "../../inputs/subscription";
import { deleteInstancedSubscriptionsOutputSchema } from "../../outputSchemas";
import { removeSubscriptions } from "../../util";

export const deleteInstancedSubscriptions = action({
  display: {
    label: "Delete Instanced Subscriptions",
    description: "Delete all webhooks that point to a flow in this instance.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const data = await removeSubscriptions(client, instanceWebhooks);
    return { data };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstancedSubscriptionsOutputSchema,
  }),
  examplePayload,
});
