import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectEventExamplePayload } from "../examplePayloads";
import { selectEventInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description:
      "A picklist of business process events for the specified worker in the Workday tenant.",
  },
  inputs: selectEventInputs,
  perform: async (_context, { connection, workerId }) => {
    if (!workerId) {
      return { result: [] };
    }
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.businessProcess}/events`,
      params: { worker: workerId },
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
  examplePayload: selectEventExamplePayload,
});
