import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput, employeeId } from "../../inputs";

export const getEmployee = action({
  display: {
    label: "Get Employee",
    description:
      "Get Employee API will return employee data currently available in Web Pay.",
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
      `/companies/${companyId}/employees/${employeeId}`,
    );
    return {
      data,
    };
  },
});
