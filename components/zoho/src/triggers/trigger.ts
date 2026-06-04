import { trigger } from "@prismatic-io/spectral";
import { notificationsTriggerInputs } from "../inputs";
import { createNotificationTrigger, deleteNotificationTrigger } from "../util/triggers";

export const notificationsTrigger = trigger({
  display: {
    label: "CRM Notifications",
    description:
      "Receive CRM event notifications from Zoho CRM. Automatically creates and manages a notification channel subscription for selected event types when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  inputs: notificationsTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  allowsBranching: false,
  perform: async (context, payload, _params) => {
    const storedChannelId = context.crossFlowState.zohoChannelId as number | undefined;

    if (!storedChannelId) {
      const body = payload.body as { channel_id?: number };
      const channelId = body?.channel_id;

      if (channelId) {
        return Promise.resolve({
          payload,
          response: {
            statusCode: 200,
            contentType: "application/json",
          },
          crossFlowState: {
            zohoChannelId: channelId,
          },
        });
      }
    }

    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
      },
    });
  },
  webhookLifecycleHandlers: {
    create: createNotificationTrigger,
    delete: deleteNotificationTrigger,
  },
});
