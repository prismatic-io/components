import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkerExamplePayload } from "../../examplePayloads/workers";
import { getWorkerInputs } from "../../inputs";
import { workerRecordOutputSchema } from "../../outputSchemas";
import type { WorkerRecord } from "../../types";
export const getWorker = action({
  display: {
    label: "Get Worker",
    description:
      "Retrieve a single worker by Person ID from the read/write Workers resource in Oracle Fusion Cloud HCM.",
  },
  examplePayload: getWorkerExamplePayload,
  inputs: getWorkerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: workerRecordOutputSchema,
  }),
  perform: async (
    context,
    { connection, personId, expand, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<WorkerRecord>(`/workers/${personId}`, {
      params: {
        expand,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
