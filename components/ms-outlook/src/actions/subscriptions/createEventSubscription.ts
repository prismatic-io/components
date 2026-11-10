import { action, outputSchema } from "@prismatic-io/spectral";
import { createEventSubscriptionOutputSchema } from "../../outputSchemas";
import { createSubscriptionTrigger } from "ms-utils";
import { createClient } from "../../client";
import { createEventSubscriptionExamplePayload } from "../../examplePayloads";
import { createEventSubscriptionInputs } from "../../inputs";
import { computeResourceBasedOnConnection } from "../../util";

export const createEventSubscription = action({
  display: {
    label: "Create Event Subscription",
    description: "Creates an event subscription for Microsoft Outlook.",
  },
  inputs: createEventSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const data = await createSubscriptionTrigger(
      client,
      {
        resource: computeResourceBasedOnConnection(params.connection, "me/events"),
        notificationUrl: params.notificationUrl,
        changeType: "updated",
        expirationDateTime: params.expirationDateTime,
        allowDuplicates: params.allowDuplicates,
      },
      context,
    );
    return { data };
  },
  examplePerform: async () => createEventSubscriptionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEventSubscriptionOutputSchema,
  }),
  examplePayload: createEventSubscriptionExamplePayload,
});
