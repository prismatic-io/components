import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../../client";
import { disableNotificationExamplePayload } from "../../examplePayloads/notifications";
import { notificationDisableInputs } from "../../inputs";

export const crmDisableNotification = action({
  display: {
    label: "CRM - Disable Notification",
    description: "Stop all instant notifications enabled for the specified channels.",
  },
  inputs: notificationDisableInputs,
  perform: async (context, { connection, channelIds }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const { data } = await crmClient.delete("/actions/watch", {
      params: {
        channel_ids: channelIds,
      },
    });

    return {
      data,
    };
  },
  examplePayload: disableNotificationExamplePayload,
});
