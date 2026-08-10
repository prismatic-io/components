import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPublicWorkerExamplePayload } from "../../examplePayloads/workers";
import { getPublicWorkerInputs } from "../../inputs";
import { workerOutputSchema } from "../../outputSchemas";
import type { Worker } from "../../types";
export const getPublicWorker = action({
  display: {
    label: "Get Public Worker",
    description:
      "Retrieve a single worker by Person ID from the read-only Public Workers resource in Oracle Fusion Cloud HCM.",
  },
  examplePayload: getPublicWorkerExamplePayload,
  inputs: getPublicWorkerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: workerOutputSchema,
  }),
  perform: async (
    context,
    { connection, personId, expand, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Worker>(`/publicWorkers/${personId}`, {
      params: {
        expand,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
