import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../../client";
import { enableNotificationExamplePayload } from "../../examplePayloads/notifications";
import { notificationEnableInputs } from "../../inputs";
import { enableNotificationChannel } from "../../util/notifications";

export const crmEnableNotification = action({
  display: {
    label: "CRM - Enable Notification",
    description: "Enable instant notifications for actions on a Zoho CRM module.",
  },
  inputs: notificationEnableInputs,
  perform: async (
    context,
    {
      connection,
      channelId,
      events,
      notifyUrl,
      token,
      channelExpiry,
      returnAffectedFieldValues,
      notifyOnRelatedAction,
      notificationCondition,
    },
  ) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const data = await enableNotificationChannel(crmClient, {
      channelId,
      events,
      notifyUrl,
      token,
      channelExpiry,
      returnAffectedFieldValues,
      notifyOnRelatedAction,
      notificationCondition,
    });

    return { data };
  },
  examplePayload: enableNotificationExamplePayload,
});
