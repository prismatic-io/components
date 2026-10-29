import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { archiveContactInputs } from "../../inputs";
import { archiveContactExamplePayload } from "../../examplePayloads";

export const archiveContact = action({
  display: {
    label: "Archive Contact",
    description: "Archive a contact by ID.",
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
  inputs: archiveContactInputs,

  examplePayload: archiveContactExamplePayload,
});
