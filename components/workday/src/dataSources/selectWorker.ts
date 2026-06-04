import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "A picklist of workers in your Workday tenant.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.timeTracking}/workers`);

    return {
      result: toSortedPicklist(
        data.data,
        (item: { workerId: string; descriptor: string }) => ({
          key: item.workerId,
          label: item.descriptor || item.workerId,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "John Smith",
        key: "3aa5550b7fe348b98d7b5741afc65534",
      },
    ],
  },
});
