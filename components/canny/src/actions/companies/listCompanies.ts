import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { listCompaniesInputs } from "../../inputs";
import { listCompaniesOutputSchema } from "../../outputSchemas";
import { paginateCursor } from "../../util";
export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Lists companies with cursor-based pagination.",
  },
  inputs: listCompaniesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompaniesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, companySearch, segment, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/companies/list",
      "companies",
      {
        search: companySearch,
        segment,
        cursor: pagination.cursor,
        limit: pagination.limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCompaniesExamplePayload,
  examplePayload: listCompaniesExamplePayload,
});
