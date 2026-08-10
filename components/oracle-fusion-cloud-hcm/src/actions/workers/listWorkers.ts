import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWorkersExamplePayload } from "../../examplePayloads/workers";
import { listWorkersInputs } from "../../inputs";
import { listWorkersOutputSchema } from "../../outputSchemas";
import type { WorkerRecord } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieve a paginated list of workers from the read/write Workers resource in Oracle Fusion Cloud HCM.",
  },
  examplePayload: listWorkersExamplePayload,
  inputs: listWorkersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWorkersOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination,
      effectiveDate,
      expand,
      includeMetadataLinks,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<WorkerRecord>(
      client,
      "/workers",
      fetchAll,
      {
        offset: pagination.offset,
        limit: pagination.limit,
        effectiveDate,
        expand,
        onlyData: includeMetadataLinks,
      },
    );
    return { data };
  },
});
