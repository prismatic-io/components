import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGradesExamplePayload } from "../../examplePayloads/grades";
import { listGradesInputs } from "../../inputs";
import { listGradesOutputSchema } from "../../outputSchemas";
import type { Grade } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listGrades = action({
  display: {
    label: "List Grades",
    description:
      "Retrieve a paginated list of compensation grades from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listGradesExamplePayload,
  inputs: listGradesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGradesOutputSchema,
  }),
  perform: async (
    context,
    { connection, fetchAll, pagination, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Grade>(client, "/grades", fetchAll, {
      offset: pagination.offset,
      limit: pagination.limit,
      effectiveDate,
      onlyData: includeMetadataLinks,
    });
    return { data };
  },
});
