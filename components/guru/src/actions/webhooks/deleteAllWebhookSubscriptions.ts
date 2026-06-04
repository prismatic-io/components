import { action } from "@prismatic-io/spectral";
import { deleteAllWebhookSubscriptionsInputs } from "../../inputs";
import type { GuruWebhookSubscription } from "../../types";
import { listWebhookSubscriptions } from "./listWebhookSubscriptions";
import { deleteWebhookSubscription } from "./deleteWebhookSubscription";
import { deleteAllWebhookSubscriptionsPayload } from "../../examplePayloads";

export const deleteAllWebhookSubscriptions = action({
  display: {
    label: "Delete All Webhook Subscriptions",
    description:
      "Delete all webhook subscriptions for the current user (use with caution)",
  },
  perform: async (context, { connection }) => {
    const { data: subscriptionsData } = await listWebhookSubscriptions.perform(
      context,
      {
        connection,
      },
    );

    const subscriptions = subscriptionsData as GuruWebhookSubscription[];

    const results = await Promise.allSettled(
      subscriptions.map((subscription) =>
        deleteWebhookSubscription
          .perform(context, {
            connection,
            webhookId: subscription.id,
          })
          .then(() => subscription.id),
      ),
    );

    const deletedSubscriptions: string[] = [];
    const failedSubscriptions: string[] = [];

    results.forEach((result, i) => {
      const subscriptionId = subscriptions[i].id;
      if (result.status === "fulfilled") {
        deletedSubscriptions.push(result.value);
      } else {
        failedSubscriptions.push(subscriptionId);
        context.logger.warn(
          `Failed to delete subscription ${subscriptionId}:`,
          result.reason?.message ?? result.reason,
        );
      }
    });

    const data = {
      message: `Successfully deleted ${deletedSubscriptions.length} webhook subscriptions`,
      deletedCount: deletedSubscriptions.length,
      failedCount: failedSubscriptions.length,
      totalCount: subscriptions.length,
      deletedSubscriptions,
      failedSubscriptions,
    };

    return { data };
  },
  inputs: deleteAllWebhookSubscriptionsInputs,
  examplePayload: deleteAllWebhookSubscriptionsPayload,
});
