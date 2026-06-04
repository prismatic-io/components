import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { contactId, connectionInput } from "../../inputs";
import { archiveContactExamplePayload } from "../../examplePayloads";

export const archiveContact = action({
  display: {
    label: "Archive Contact",
    description: "Archive the information and metadata of a contact by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/contacts/${params.contactId}`, {
      ContactID: params.contactId,
      ContactStatus: "ARCHIVED",
    });
    return { data };
  },
  inputs: { contactId, xeroConnection: connectionInput },

  examplePayload: archiveContactExamplePayload,
});
