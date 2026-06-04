import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { DEFAULT_PER_PAGE } from "../constants";
import { selectNotificationChannelExamplePayload } from "../examplePayloads/dataSources";
import { selectNotificationChannelInputs } from "../inputs";
import type { NotificationChannel } from "../types";
import { getNotificationChannelLabel } from "../util/general";
import { fetchAllPages } from "../util/pagination";

export const selectNotificationChannel = dataSource({
  display: {
    label: "Select Notification Channel",
    description: "Select an existing notification channel from Zoho CRM.",
  },
  inputs: selectNotificationChannelInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, ClientType.CRM, false);

    const response = await fetchAllPages(
      client,
      "/actions/watch",
      { per_page: DEFAULT_PER_PAGE },
      "watch",
      true,
    );

    const channels = response.watch as NotificationChannel[];

    if (channels?.length) {
      const result = channels.map<Element>((channel) => ({
        label: getNotificationChannelLabel(channel),
        key: util.types.toString(channel.channel_id),
      }));
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: selectNotificationChannelExamplePayload,
});
