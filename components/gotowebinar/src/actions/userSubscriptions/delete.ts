import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { deleteUserSubscriptionInputs } from "../../inputs/subscriptions/deleteUserSubscriptionInputs";
import { GENERAL_DELETE_MESSAGE } from "../../constants";

export const deleteUserSubscription = action({
  display: {
    label: "Delete User Subscriptions",
    description: "Deletes one or more user subscriptions.",
  },
  inputs: deleteUserSubscriptionInputs,
  examplePayload: GENERAL_DELETE_MESSAGE,
  perform: async (
    { debug: { enabled: debug } },
    { connection, deleteWebhook, userSubscriptionKeys },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    if (!deleteWebhook) {
      await client.delete("/userSubscriptions", { data: userSubscriptionKeys });
      return GENERAL_DELETE_MESSAGE;
    }

    const ids = [];
    for await (const userSubscriptionKey of userSubscriptionKeys) {
      const { data: userSubscription } = await client.get(
        `/userSubscriptions/${userSubscriptionKey}`,
      );

      ids.push(userSubscription.webhookKey);
    }

    await client.delete(`/webhooks`, { data: ids });
    return GENERAL_DELETE_MESSAGE;
  },
});
