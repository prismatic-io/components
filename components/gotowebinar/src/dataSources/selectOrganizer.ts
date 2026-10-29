import { dataSource, type Element } from "@prismatic-io/spectral";
import { accountKey, connection, fromTime, toTime } from "../inputs";
import { createGotoWebinarClient } from "../client";
import type { Webinar } from "../types";
import { getEndTime, getFromTime } from "../util";

export const selectOrganizer = dataSource({
  display: {
    label: "Select Organizer",
    description:
      "Select an organizer from the list of available organizer keys.",
  },
  inputs: {
    connection,
    accountKey,
    fromTime: {
      ...fromTime,
      required: false,
      default: getFromTime(),
    },
    toTime: {
      ...toTime,
      required: false,
      default: getEndTime(),
    },
  },
  perform: async (context, { connection, accountKey, fromTime, toTime }) => {
    const { client } = createGotoWebinarClient(connection, false);
    const url = `/accounts/${accountKey}/webinars`;
    const params = {
      fromTime,
      toTime,
    };

    const { data } = await client.get(url, { params });
    const webinars = data._embedded.webinars as Webinar[];
    if (!webinars) {
      return {
        result: [],
      };
    }

    const organizerKeys = webinars
      .map(({ organizerKey, subject }) => {
        return {
          organizerKey,
          subject,
        };
      })
      .filter((value, index, self) => self.indexOf(value) === index);

    const result = organizerKeys.map(({ organizerKey, subject }): Element => {
      return {
        key: organizerKey,
        label: `Organizer for ${subject}`,
      };
    });

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
