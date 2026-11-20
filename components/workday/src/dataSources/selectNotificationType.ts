import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectNotificationTypeExamplePayload } from "../examplePayloads";
import { selectNotificationTypeInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectNotificationType = dataSource({
  display: {
    label: "Select Notification Type",
    description: "A picklist of notification types in the Workday tenant.",
  },
  inputs: selectNotificationTypeInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.connect}/notificationTypes`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as WorkdayInstanceSummary[], (item) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectNotificationTypeExamplePayload,
});
