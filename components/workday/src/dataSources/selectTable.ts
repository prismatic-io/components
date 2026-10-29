import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectTableExamplePayload } from "../examplePayloads";
import { selectTableInputs } from "../inputs";
import type { PrismAnalyticsSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "A picklist of tables in the Workday Prism Analytics tenant.",
  },
  inputs: selectTableInputs,
  perform: async (_context, { connection, tenant }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/tables`,
    );

    return {
      result: toSortedPicklist(data.data, (item: PrismAnalyticsSummary) => ({
        key: item.id,
        label: item.displayName,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectTableExamplePayload,
});
