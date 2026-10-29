import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput, employeeId } from "../../inputs";

export const getSensitiveData = action({
  display: {
    label: "Get Sensitive Data",
    description:
      "Gets employee sensitive data information directly from Web Pay.",
  },
  inputs: {
    connectionInput,
    employeeId,
    companyId,
  },
  perform: async (context, { connectionInput, employeeId, companyId }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/employees/${employeeId}/sensitivedata`,
    );
    return {
      data,
    };
  },
});
