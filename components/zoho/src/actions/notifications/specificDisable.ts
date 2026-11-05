import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../../client";
import { disableSpecificNotificationExamplePayload } from "../../examplePayloads/notifications";
import { notificationSpecificDisableInputs } from "../../inputs";
import { disableSpecificNotificationEvents } from "../../util/notifications";

export const crmDisableSpecificNotification = action({
  display: {
    label: "CRM - Disable Specific Notification",
    description:
      "Disable notifications for specific events in a channel without disabling the entire channel.",
  },
  inputs: notificationSpecificDisableInputs,
  perform: async (context, { connection, channelId, events, notifyOnRelatedAction }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const data = await disableSpecificNotificationEvents(crmClient, {
      channelId,
      events,
      notifyOnRelatedAction,
    });

    return { data };
  },
  examplePayload: disableSpecificNotificationExamplePayload,
});
