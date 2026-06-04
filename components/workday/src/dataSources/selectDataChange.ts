import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection, tenant } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectDataChange = dataSource({
  display: {
    label: "Select Data Change",
    description:
      "A picklist of data changes in your Workday Prism Analytics tenant.",
  },
  inputs: {
    connection,
    tenant,
  },
  perform: async (_context, { connection, tenant }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/dataChanges`,
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
        label: "Employee Data Upload",
        key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
      },
    ],
  },
});
