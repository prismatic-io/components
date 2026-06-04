import { action } from "@prismatic-io/spectral";
import { createSubscriptionTrigger } from "ms-utils";
import { createClient } from "../../client";
import { createEventSubscriptionExamplePayload } from "../../examplePayloads";
import { createEventSubscriptionInputs } from "../../inputs";

export const createEventSubscription = action({
  display: {
    label: "Create Event Subscription",
    description: "Creates an event subscription for Microsoft Outlook.",
  },
  inputs: createEventSubscriptionInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const data = await createSubscriptionTrigger(
      client,
      {
        resource: "me/events",
        notificationUrl: params.notificationUrl,
        changeType: "updated",
        expirationDateTime: params.expirationDateTime,
        allowDuplicates: params.allowDuplicates,
      },
      context,
    );
    return { data };
  },
  examplePayload: createEventSubscriptionExamplePayload,
});
