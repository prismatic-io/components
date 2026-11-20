import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectBusinessProcessTypeExamplePayload } from "../examplePayloads";
import { selectBusinessProcessTypeInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectBusinessProcessType = dataSource({
  display: {
    label: "Select Business Process Type",
    description: "A picklist of business process types in the Workday tenant.",
  },
  inputs: selectBusinessProcessTypeInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.businessProcess}/types`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as WorkdayInstanceSummary[], (item) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectBusinessProcessTypeExamplePayload,
});
