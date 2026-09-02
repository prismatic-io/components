import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContactInputs } from "../../inputs";
export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new contact.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      contactCompany,
      contactInfo,
      contactFirstName,
      contactlastName,
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
    const { data } = await client.post("/crm/v3/objects/contacts", {
      properties: {
        company: contactCompany,
        email: contactInfo.contactEmail,
        firstname: contactFirstName,
        lastname: contactlastName,
        phone: contactInfo.phone,
        website: contactInfo.website,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: createContactInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createContactExamplePayload.data,
  }),
  examplePayload: createContactExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
