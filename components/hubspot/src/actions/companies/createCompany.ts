import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createCompanyExamplePayload } from "../../examplePayloads";
import { createCompanyInputs } from "../../inputs";
export const createCompany = action({
  display: {
    label: "Create Company",
    description: "Create a new company.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      companyName,
      industry,
      companyPhone,
      domain,
      city,
      state,
      timeout,
      fieldValues,
      dynamicValues,
      description,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.post("/crm/v3/objects/companies", {
      properties: {
        city,
        domain,
        industry,
        name: companyName,
        phone: companyPhone,
        state,
        description: description,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: createCompanyInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createCompanyExamplePayload.data,
  }),
  examplePayload: createCompanyExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
