import { type HttpResponse, trigger, util } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { connectionInput } from "../inputs/general";
import { resource } from "../inputs/subscriptions";
import { createSubscriptionFn, deleteAllSubscriptionsFn } from "../utils";

export const webhook = trigger({
  display: {
    label: "Managed Subscription Events",
    description:
      "Automatically registers and manages webhook subscriptions for resource changes in Business Central.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: {
    connection: connectionInput,
    resource,
  },
  staticBranchNames: ["Notification", "URL Validation"],
  perform: async (_context, payload) => {
    const rawValidationToken = payload.queryParameters?.validationToken;
    const validationToken = util.types.toString(rawValidationToken);

    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain",
      body: validationToken,
    };

    return Promise.resolve({
      payload,
      response,
      branch: validationToken ? "URL Validation" : "Notification",
    });
  },
  webhookLifecycleHandlers: {
    create: async (context, { resource, connection }) => {
      const notificationUrl = context.webhookUrls[context.flow.name];
      const client = getMsBusinessCentralClient(connection, context, true);
      await createSubscriptionFn(client, notificationUrl, resource);
    },
    delete: async (context, { resource, connection }) => {
      const notificationUrl = context.webhookUrls[context.flow.name];
      const client = getMsBusinessCentralClient(connection, context, true);
      const instanceWebhookUrl = new Set([notificationUrl]);
      const subscriptionsToRemove = await deleteAllSubscriptionsFn(
        client,
        instanceWebhookUrl,
        resource,
      );
      context.logger.info(
        `Removed ${subscriptionsToRemove.length} subscriptions from Microsoft Dynamics 365 Business Central`,
      );
    },
  },
});
