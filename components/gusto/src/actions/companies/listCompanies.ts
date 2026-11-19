import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { listCompaniesInputs } from "../../inputs";
import { createClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { fetchAllPages } from "../../util";
import { listCompaniesOutputSchema } from "../../outputSchemas";

export const listCompanies = action({
  display: {
    label: "List Companies",
    description:
      "Lists all companies that the currently authenticated user is a part of.",
  },
  inputs: listCompaniesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompaniesOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(client, "/companies");
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get("/companies", {
      params: { page: params.page },
    });
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: listCompaniesExamplePayload,
});
