import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description:
      "A picklist of business process events in your Workday tenant.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.businessProcess}/events`);

    return {
      result: toSortedPicklist(
        data.data,
        (item: { id: string; descriptor: string }) => ({
          key: item.id,
          label: item.descriptor,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Hire: John Smith",
        key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
      },
    ],
  },
});
