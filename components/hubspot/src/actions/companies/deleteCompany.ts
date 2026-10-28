import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteCompanyExamplePayload } from "../../examplePayloads";
import { deleteCompanyInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
export const deleteCompany = action({
  display: {
    label: "Delete Company",
    description: "Delete an existing company by Id.",
  },
  performSafety: "notAllowed",
  perform: async (context, { companyId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(
      hubspotPaths.objects("companies", `/${companyId}`),
    );
    return { data };
  },
  inputs: deleteCompanyInputs,
  examplePerform: async () => ({
    data: deleteCompanyExamplePayload.data,
  }),
  examplePayload: deleteCompanyExamplePayload,
});
