import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateContactExamplePayload } from "../../examplePayloads";
import { updateContactInputs } from "../../inputs";
export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update the information and metadata of an existing contact.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      contactId,
      contactUpdateCompany,
      contactInfo,
      contactUpdateFirstName,
      contactUpdatelastName,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.patch(
      `/crm/v3/objects/contacts/${contactId}`,
      {
        properties: {
          company: contactUpdateCompany,
          email: contactInfo.contactUpdateEmail,
          firstname: contactUpdateFirstName,
          lastname: contactUpdatelastName,
          phone: contactInfo.updatePhone,
          website: contactInfo.updateWebsite,
          ...fieldValues,
          ...dynamicValues,
        },
      },
    );
    return { data };
  },
  inputs: updateContactInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateContactExamplePayload.data,
  }),
  examplePayload: updateContactExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
