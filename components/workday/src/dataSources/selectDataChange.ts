import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectDataChangeExamplePayload } from "../examplePayloads";
import { selectDataChangeInputs } from "../inputs";
import type { PrismAnalyticsSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectDataChange = dataSource({
  display: {
    label: "Select Data Change",
    description:
      "A picklist of data changes in the Workday Prism Analytics tenant.",
  },
  inputs: selectDataChangeInputs,
  perform: async (_context, { connection, tenant }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/dataChanges`,
      { params: { type: "summary" } },
    );

    return {
      result: toSortedPicklist(data.data, (item: PrismAnalyticsSummary) => ({
        key: item.id,
        label: item.displayName,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectDataChangeExamplePayload,
});
