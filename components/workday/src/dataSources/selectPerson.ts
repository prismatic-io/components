import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectPerson = dataSource({
  display: {
    label: "Select Person",
    description: "A picklist of people in your Workday tenant.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.person}/people`);

    return {
      result: toSortedPicklist(data.data, (item: { id: string }) => ({
        key: item.id,
        label: item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "3aa5550b7fe348b98d7b5741afc65534",
        key: "3aa5550b7fe348b98d7b5741afc65534",
      },
    ],
  },
});
