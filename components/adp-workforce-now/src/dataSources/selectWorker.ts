import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createSimpleClient } from "../client";
import { selectWorkerExamplePayload } from "../examplePayloads";
import { selectWorkerInputs } from "../inputs";
import type { Worker } from "../types";
import { fetchAllRecords } from "../util";
export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "Select a worker from the ADP Workforce Now account.",
  },
  inputs: selectWorkerInputs,
  perform: async (_context, { connection, $filter }) => {
    const client = await createSimpleClient(connection);
    const { data } = await fetchAllRecords<Worker>(
      client,
      "/hr/v2/workers",
      "workers",
      true,
      { $filter },
    );
    const result: Element[] = data.map((worker) => ({
      label: `${worker.person.legalName.formattedName} (${worker.workerID.idValue})`,
      key: util.types.toString(worker.associateOID),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectWorkerExamplePayload,
});
