import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createSimpleClient } from "../client";
import { selectWorkerExamplePayload } from "../examplePayloads";
import { $filter, $select, connection } from "../inputs";
import type { Worker } from "../types";
import { fetchAllRecords } from "../util";

export const selectWorker = dataSource({
  display: {
    label: "Select Worker",
    description: "Select a worker from your ADP Workforce Now account",
  },
  inputs: {
    $filter,
    $select,
    connection,
  },
  perform: async (_context, { connection, $filter, $select }) => {
    const client = await createSimpleClient(connection);
    const { data } = await fetchAllRecords<Worker>(
      client,
      "/hr/v2/workers",
      "workers",
      true,
      {
        $filter,
        $select,
      },
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
