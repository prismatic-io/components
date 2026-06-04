import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectMessageTemplate = dataSource({
  display: {
    label: "Select Message Template",
    description: "A picklist of message templates in your Workday tenant.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.connect}/messageTemplates`);

    return {
      result: toSortedPicklist(
        data.data,
        (item: { id: string; name: string }) => ({
          key: item.id,
          label: item.name,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Welcome Email Template",
        key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
      },
    ],
  },
});
