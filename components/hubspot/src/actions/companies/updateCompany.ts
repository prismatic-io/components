import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateCompanyExamplePayload } from "../../examplePayloads";
import { updateCompanyInputs } from "../../inputs";
export const updateCompany = action({
  display: {
    label: "Update Company",
    description: "Update the information and metadata of an existing company.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      companyId,
      updateCompanyName,
      industry,
      companyPhone,
      updateDomain,
      city,
      state,
      timeout,
      fieldValues,
      dynamicValues,
      description,
      hubspotConnection,
    },
  ) => {
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest: context.debug.enabled,
    });
    const { data } = await client.patch(
      `/crm/v3/objects/companies/${companyId}`,
      {
        properties: {
          city: city,
          domain: updateDomain,
          industry: industry,
          name: updateCompanyName,
          phone: companyPhone,
          state: state,
          description: description,
          ...fieldValues,
          ...dynamicValues,
        },
      },
    );
    return { data };
  },
  inputs: updateCompanyInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateCompanyExamplePayload.data,
  }),
  examplePayload: updateCompanyExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
