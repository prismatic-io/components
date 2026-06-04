import { dataSource, Element } from "@prismatic-io/spectral";
import { accountKey, connection, fromTime, toTime } from "../inputs/general";
import { createGotoWebinarClient } from "../client";
import { Webinar } from "../interfaces";
import { getEndTime, getFromTime } from "../utils";

export const selectWebinar = dataSource({
  display: {
    label: "Select Webinar",
    description:
      "Select a webinar from the list of available webinars by your Account Key.",
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
  perform: async (context, { connection, accountKey, toTime, fromTime }) => {
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

    const result = webinars.map(({ subject, webinarKey }): Element => {
      return {
        key: webinarKey,
        label: subject,
      };
    });

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
