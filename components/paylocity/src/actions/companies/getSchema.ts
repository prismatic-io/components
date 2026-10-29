import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput } from "../../inputs";

export const getCompanySpecificSchema = action({
  display: {
    label: "Get Company Specific Schema",
    description:
      "The company-specific Open API endpoint allows the client to GET an Open API document for the Paylocity API that is customized with company-specific resource schemas.",
  },
  inputs: {
    connectionInput,
    companyId,
  },
  perform: async (context, { connectionInput, companyId }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(`/companies/${companyId}/openapi`);
    return {
      data,
    };
  },
});
