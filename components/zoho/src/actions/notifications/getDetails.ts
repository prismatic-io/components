import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../../client";
import { getNotificationDetailsExamplePayload } from "../../examplePayloads/notifications";
import { notificationGetDetailsInputs } from "../../inputs";
import { fetchAllPages } from "../../util/pagination";

export const crmGetNotificationDetails = action({
  display: {
    label: "CRM - Get Notification Details",
    description: "Retrieve the details of notifications enabled for a specific channel.",
  },
  inputs: notificationGetDetailsInputs,
  perform: async (context, { connection, channelId, module, page, per_page, fetchAll }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const data = await fetchAllPages(
      crmClient,
      "/actions/watch",
      {
        channelId,
        per_page,
        page,
        module,
      },
      "watch",
      fetchAll,
    );

    return {
      data,
    };
  },
  examplePayload: getNotificationDetailsExamplePayload,
});
