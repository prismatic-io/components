import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all available Subscriptions.",
  },
  inputs: listSubscriptionsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, showInstanceSubscriptions }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { notificationUrl: string; [key: string]: unknown }[];
    }>("/subscriptions");

    if (showInstanceSubscriptions) {
      const instanceWebhooks = new Set(Object.values(context.webhookUrls));
      const instanceSubscriptions = data.value.filter(({ notificationUrl }) =>
        instanceWebhooks.has(notificationUrl),
      );
      return { data: { ...data, value: instanceSubscriptions } };
    }

    return { data };
  },
  examplePerform: async () => listSubscriptionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  examplePayload: listSubscriptionsExamplePayload,
});
