import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getSiteContactsExamplePayload } from "../../examplePayloads/sites";
import { getSiteContactsInputs } from "../../inputs";






export const getSiteContacts = action({
  display: {
    label: "Get Site Contacts",
    description: "Retrieve contacts associated with a specific site.",
  },
  inputs: getSiteContactsInputs,
  perform: async (context, { ssvConnection, siteId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(`/v3/site/${siteId}/contacts`);

    return { data };
  },
  examplePayload: getSiteContactsExamplePayload,
});
