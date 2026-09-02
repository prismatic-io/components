import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCompanyExamplePayload } from "../../examplePayloads";
import { updateCompanyInputs } from "../../inputs";
import { updateCompanyOutputSchema } from "../../outputSchemas";
export const updateCompany = action({
  display: {
    label: "Update Company",
    description: "Updates an existing company.",
  },
  inputs: updateCompanyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCompanyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, companyIdRequired, companyName, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/companies/update", {
      id: companyIdRequired,
      name: companyName,
      monthlySpend: additionalFields.monthlySpend,
      customFields: additionalFields.customFields,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateCompanyExamplePayload,
  examplePayload: updateCompanyExamplePayload,
});
