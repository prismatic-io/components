import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectWorkerExamplePayload } from "../examplePayloads";
import { selectWorkerInputs } from "../inputs";
import type { WorkdayWorkerSummary } from "../types";
import { toSortedPicklist } from "../util";
export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "A picklist of workers in the Workday tenant.",
  },
  inputs: selectWorkerInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.timeTracking}/workers`);
    return {
      result: toSortedPicklist(data.data, (item: WorkdayWorkerSummary) => ({
        key: item.workerId,
        label: item.descriptor || item.workerId,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectWorkerExamplePayload,
});
