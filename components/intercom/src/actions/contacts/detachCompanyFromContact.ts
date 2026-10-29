import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DETACH_COMPANY_FROM_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, idInput } from "../../inputs";
import { companyIdInput } from "../../inputs/general";

export const detachCompany = action({
  display: {
    label: "Detach Company from Contact",
    description: "Detach Company from Contact",
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
    const { data } = await client.delete(
      `/contacts/${id}/companies/${companyId}`,
    );
    return { data };
  },
  examplePayload: DETACH_COMPANY_FROM_CONTACT_EXAMPLE_PAYLOAD,
});
