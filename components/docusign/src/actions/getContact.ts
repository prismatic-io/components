import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { cloudProvider, connection, contactId } from "../inputs";
import { getContactPayload } from "../examplePayloads";

export const getContact = action({
  display: {
    label: "Get Contact",
    description:
      "This method returns one or more contacts associated with a DocuSign account.",
  },
  perform: async (context, { connection, contactId, cloudProvider }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/contacts/${contactId}`, {
      params: {
        cloud_provider: cloudProvider || undefined,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    contactId,
    cloudProvider,
  },
  examplePayload: getContactPayload,
});
