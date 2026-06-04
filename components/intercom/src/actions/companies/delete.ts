import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DELETE_COMPANY_EXAMPLE_PAYLOAD } from "../../examplePayloads/companies";
import { connectionInput } from "../../inputs";
import { companyIdInput } from "../../inputs/general";

export const deleteCompany = action({
  display: {
    label: "Delete Company",
    description: "Delete an existing Company",
  },
  inputs: {
    connection: connectionInput,
    id: companyIdInput,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/companies/${id}`);
    return { data };
  },
  examplePayload: DELETE_COMPANY_EXAMPLE_PAYLOAD,
});
