import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteContactExamplePayload } from "../../examplePayloads";
import { deleteContactInputs } from "../../inputs";
export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete a contact by Id.",
  },
  performSafety: "notAllowed",
  perform: async (context, { contactId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(
      `/crm/v3/objects/contacts/${contactId}`,
    );
    return { data };
  },
  inputs: deleteContactInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteContactExamplePayload.data,
  }),
  examplePayload: deleteContactExamplePayload,
});
