import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectWorkerExamplePayload } from "../examplePayloads";
import { selectWorkerInputs } from "../inputs";
import type { WorkdayWorkerSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "A picklist of workers in the Workday tenant.",
  },
  inputs: selectWorkerInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.timeTracking}/workers`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as WorkdayWorkerSummary[], (item) => ({
        key: item.id,
        label: item.descriptor || item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectWorkerExamplePayload,
});
