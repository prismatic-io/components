import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs/subscriptions";
import { createSubscriptionFn, listSubscriptionsFn } from "../../utils";

export const createEventSubscription = action({
  display: {
    label: "Create Event Subscription",
    description: "Create an Event subscription for Microsoft Business Central.",
  },
  inputs: createSubscriptionInputs,
  perform: async (context, { allowDuplicates, connection, notificationUrl, resource }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    if (!allowDuplicates) {
      const instanceWebhooks = new Set([notificationUrl]);
      const {
        value: [existingSubscription],
      } = await listSubscriptionsFn(client, instanceWebhooks, true);
      if (existingSubscription) {
        context.logger.info(
          "A webhook with the specified Notification URL already exists. Skipping webhook creation and returning existing webhook.",
        );
        return { data: existingSubscription };
      }
    }

    const data = await createSubscriptionFn(client, notificationUrl, resource);
    return { data };
  },
  examplePayload: createSubscriptionExamplePayload,
});
