import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection, tenant } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "A picklist of tables in your Workday Prism Analytics tenant.",
  },
  inputs: {
    connection,
    tenant,
  },
  perform: async (_context, { connection, tenant }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/tables`,
    );

    return {
      result: toSortedPicklist(
        data.data,
        (item: { id: string; displayName: string }) => ({
          key: item.id,
          label: item.displayName,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Employee Demographics",
        key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
      },
    ],
  },
});
