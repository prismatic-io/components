import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { contactId, connectionInput } from "../../inputs";
import { getContactExamplePayload } from "../../examplePayloads";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Get the information and metadata of a contact by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/contacts/${params.contactId}`);
    return { data };
  },
  inputs: { contactId, xeroConnection: connectionInput },
  examplePayload: getContactExamplePayload,
});
