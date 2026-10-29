import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getContactInputs } from "../../inputs";
import { getContactExamplePayload } from "../../examplePayloads";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieve the information and metadata of a contact by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/contacts/${params.contactId}`);
    return { data };
  },
  inputs: getContactInputs,
  examplePayload: getContactExamplePayload,
});
