import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCompanyExamplePayload } from "../../examplePayloads";
import { deleteCompanyInputs } from "../../inputs";
import { deleteCompanyOutputSchema } from "../../outputSchemas";
export const deleteCompany = action({
  display: {
    label: "Delete Company",
    description: "Deletes a company.",
  },
  inputs: deleteCompanyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCompanyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, companyIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/companies/delete", {
      companyID: companyIdRequired,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteCompanyExamplePayload,
  examplePayload: deleteCompanyExamplePayload,
});
