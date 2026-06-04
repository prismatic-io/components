import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const enterpriseAdminGetServerStatistics = action({
  display: {
    label: "Enterprise Admin Get Server Statistics",
    description: "Get GitHub Enterprise Server statistics",
  },
  perform: async (
    context,
    { connection, enterpriseOrOrg, dateStart, dateEnd },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/enterprise-installation/${enterpriseOrOrg}/server-statistics`,
      { params: { date_start: dateStart, date_end: dateEnd } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    enterpriseOrOrg: {
      label: "Enterprise Or Org",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The slug version of the enterprise name or the login of an organization",
    },
    dateStart: {
      label: "Date Start",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
    },
    dateEnd: {
      label: "Date End",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A cursor, as given in the [Link header](https://docs",
    },
  },
});

export default {
  enterpriseAdminGetServerStatistics,
};
