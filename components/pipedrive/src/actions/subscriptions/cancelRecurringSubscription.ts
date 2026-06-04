import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, subscriptionIdInput } from "../../inputs";
import { cleanString } from "../../util";

export const cancelRecurringSubscription = action({
  display: {
    label: "Cancel Recurring Subscription (Deprecated)",
    description: "Cancels a recurring subscription.",
  },
  perform: async (context, { connection, id, endDate }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/subscriptions/recurring/${id}/cancel`, {
      end_date: endDate,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: subscriptionIdInput,
    endDate: input({
      label: "End Date",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The subscription termination date",
    }),
  },
});
