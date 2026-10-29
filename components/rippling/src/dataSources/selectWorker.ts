import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface WorkerRecord {
  id: string;
  work_email?: string;
  status?: string;
}

export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "Select a worker from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/workers");

    const results = data?.results as WorkerRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((worker) => ({
        label: worker.work_email || worker.id,
        key: util.types.toString(worker.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});
