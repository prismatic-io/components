import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPositionsExamplePayload } from "../../examplePayloads/positions";
import { listPositionsInputs } from "../../inputs";
import { listPositionsOutputSchema } from "../../outputSchemas";
import type { Position } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listPositions = action({
  display: {
    label: "List Positions",
    description:
      "Retrieve a paginated list of approved headcount positions from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listPositionsExamplePayload,
  inputs: listPositionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPositionsOutputSchema,
  }),
  perform: async (
    context,
    { connection, fetchAll, pagination, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Position>(
      client,
      "/positions",
      fetchAll,
      {
        offset: pagination.offset,
        limit: pagination.limit,
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    );
    return { data };
  },
});
