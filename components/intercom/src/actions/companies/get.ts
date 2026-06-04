import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GET_COMPANY_EXAMPLE_PAYLOAD } from "../../examplePayloads/companies";
import { connectionInput } from "../../inputs";
import { companyIdInput } from "../../inputs/general";

export const getCompany = action({
  display: {
    label: "Get Company",
    description: "Retrieves an existing Company",
  },
  inputs: {
    connection: connectionInput,
    id: companyIdInput,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/companies/${id}`);
    return { data };
  },
  examplePayload: GET_COMPANY_EXAMPLE_PAYLOAD,
});
