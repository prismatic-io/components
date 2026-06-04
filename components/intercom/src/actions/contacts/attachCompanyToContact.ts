import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ATTACH_COMPANY_TO_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, idInput } from "../../inputs";
import { companyIdInput } from "../../inputs/general";

export const attachCompany = action({
  display: {
    label: "Attach Company to Contact",
    description: "Attach Company to Contact",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...idInput,
      required: true,
      label: "Contact ID",
      dataSource: "selectContact",
    },
    companyId: companyIdInput,
  },
  perform: async (context, { connection, id, companyId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/contacts/${id}/companies`, {
      id: companyId,
    });
    return { data };
  },
  examplePayload: ATTACH_COMPANY_TO_CONTACT_EXAMPLE_PAYLOAD,
});
