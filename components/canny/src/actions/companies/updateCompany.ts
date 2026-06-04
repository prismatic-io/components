import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCompanyExamplePayload } from "../../examplePayloads";
import { updateCompanyInputs } from "../../inputs";

export const updateCompany = action({
  display: {
    label: "Update Company",
    description: "Updates an existing company.",
  },
  inputs: updateCompanyInputs,
  perform: async (
    context,
    {
      connection,
      companyIdRequired,
      companyName,
      monthlySpend,
      customFields,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/companies/update", {
      id: companyIdRequired,
      name: companyName,
      monthlySpend,
      customFields,
      ...additionalFields,
    });
    return { data };
  },
  examplePayload: updateCompanyExamplePayload,
});
