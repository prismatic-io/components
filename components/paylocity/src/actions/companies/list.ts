import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { codeResource, companyId, connectionInput } from "../../inputs";

export const listCompanyCodes = action({
  display: {
    label: "List Company Codes",
    description: "Get All Company Codes for the selected company and resource.",
  },
  inputs: {
    connectionInput,
    companyId,
    codeResource,
  },
  perform: async (context, { connectionInput, companyId, codeResource }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/codes/${codeResource}`,
    );
    return {
      data,
    };
  },
});
