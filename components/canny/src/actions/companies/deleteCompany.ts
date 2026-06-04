import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCompanyExamplePayload } from "../../examplePayloads";
import { deleteCompanyInputs } from "../../inputs";

export const deleteCompany = action({
  display: {
    label: "Delete Company",
    description: "Deletes a company.",
  },
  inputs: deleteCompanyInputs,
  perform: async (context, { connection, companyIdRequired }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/companies/delete", {
      companyID: companyIdRequired,
    });
    return { data };
  },
  examplePayload: deleteCompanyExamplePayload,
});
