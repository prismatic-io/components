import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput, employeeId } from "../../inputs";

export const listEarnings = action({
  display: {
    label: "List Earnings",
    description:
      "Get All Earnings returns all earnings for the selected employee.",
  },
  inputs: {
    connectionInput,
    companyId,
    employeeId,
  },
  perform: async (context, { connectionInput, companyId, employeeId }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/employees/${employeeId}/earnings`,
    );
    return {
      data,
    };
  },
});
