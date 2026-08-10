import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPublicWorkersExamplePayload } from "../../examplePayloads/workers";
import { listPublicWorkersInputs } from "../../inputs";
import { listPublicWorkersOutputSchema } from "../../outputSchemas";
import type { Worker } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listPublicWorkers = action({
  display: {
    label: "List Public Workers",
    description:
      "Retrieve a paginated list of workers from the read-only Public Workers resource in Oracle Fusion Cloud HCM.",
  },
  examplePayload: listPublicWorkersExamplePayload,
  inputs: listPublicWorkersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPublicWorkersOutputSchema,
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
    const data = await paginateResults<Worker>(
      client,
      "/publicWorkers",
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
