import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAbsencesExamplePayload } from "../../examplePayloads/absences";
import { listAbsencesInputs } from "../../inputs";
import { listAbsencesOutputSchema } from "../../outputSchemas";
import type { Absence } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listAbsences = action({
  display: {
    label: "List Absences",
    description:
      "Retrieve a paginated list of absence entries from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listAbsencesExamplePayload,
  inputs: listAbsencesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAbsencesOutputSchema,
  }),
  perform: async (
    context,
    { connection, personId, fetchAll, pagination, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Absence>(client, "/absences", fetchAll, {
      offset: pagination.offset,
      limit: pagination.limit,
      onlyData: includeMetadataLinks,
      ...(personId ? { q: `PersonId=${personId}` } : {}),
    });
    return { data };
  },
});
