import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listNotificationsExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  filterNotifications,
  includeNotifications,
  limit,
  offset,
  since,
  timeZone,
  total,
  until,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listNotifications = action({
  display: {
    label: "List Notifications",
    description: "List notifications sent within a specified time range.",
  },
  perform: async (
    context,
    {
      connection,
      limit,
      offset,
      total,
      timeZone,
      since,
      until,
      filter,
      include,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      limit,
      offset,
      total,
      time_zone: timeZone,
      since,
      until,
      filter,
      "include[]": include,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.NOTIFICATIONS,
          objectKey: "notifications",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.NOTIFICATIONS, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    since: {
      ...since,
      required: true,
      clean: util.types.toString,
    },
    until: {
      ...until,
      required: true,
      clean: util.types.toString,
    },
    limit,
    offset,
    total,
    timeZone,
    filter: filterNotifications,
    include: includeNotifications,
  },
  examplePayload: listNotificationsExamplePayload,
});
