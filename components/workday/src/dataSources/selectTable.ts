import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectTableExamplePayload } from "../examplePayloads";
import { selectTableInputs } from "../inputs";
import type { PrismAnalyticsSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "A picklist of tables in the Workday Prism Analytics tenant.",
  },
  inputs: selectTableInputs,
  perform: async (_context, { connection, tenant }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.prismAnalytics}/${tenant}/tables`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as PrismAnalyticsSummary[], (item) => ({
        key: item.id,
        label: item.displayName,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectTableExamplePayload,
});
