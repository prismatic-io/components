import { dataSource, Element } from "@prismatic-io/spectral";
import { accountKey, connection, fromTime, toTime } from "../inputs/general";
import { createGotoWebinarClient } from "../client";
import { Webinar } from "../interfaces";
import { getEndTime, getFromTime } from "../utils";

export const selectOrganizer = dataSource({
  display: {
    label: "Select Organizer",
    description: "Select a Organizer from the list of available Organizer Keys",
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
