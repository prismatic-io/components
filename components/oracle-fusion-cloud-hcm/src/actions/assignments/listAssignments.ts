import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAssignmentsExamplePayload } from "../../examplePayloads/assignments";
import { listAssignmentsInputs } from "../../inputs";
import { listAssignmentsOutputSchema } from "../../outputSchemas";
import type { Assignment } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listAssignments = action({
  display: {
    label: "List Assignments",
    description:
      "Retrieve a paginated list of worker assignments. Assignments contain job, department, location, manager, and employment type details.",
  },
  examplePayload: listAssignmentsExamplePayload,
  inputs: listAssignmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssignmentsOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
      personId,
      fetchAll,
      pagination,
      effectiveDate,
      expand,
      includeMetadataLinks,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Assignment>(
      client,
      `/publicWorkers/${personId}/child/assignments`,
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
