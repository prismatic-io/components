import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../../client";
import { updateNotificationExamplePayload } from "../../examplePayloads/notifications";
import { notificationUpdateInputs } from "../../inputs";
import type { WatchConfig } from "../../types";
import { fillNotificationsBody } from "../../util/general";

export const crmUpdateNotification = action({
  display: {
    label: "CRM - Update Notification",
    description: "Update specific information of a notification enabled for a channel.",
  },
  inputs: notificationUpdateInputs,
  perform: async (
    context,
    { connection, channelId, events, notifyUrl, token, channelExpiry, notificationCondition },
  ) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const watchConfig: WatchConfig = {
      channel_id: channelId,
    };

    fillNotificationsBody(
      {
        token,
        channelExpiry,
        notificationCondition,
        events,
        notifyUrl,
      },
      watchConfig,
    );

    const { data } = await crmClient.patch("/actions/watch", {
      watch: [watchConfig],
    });

    return {
      data,
    };
  },
  examplePayload: updateNotificationExamplePayload,
});
