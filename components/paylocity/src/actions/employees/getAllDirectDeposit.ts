import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput, employeeId } from "../../inputs";

export const getAllDirectDeposit = action({
  display: {
    label: "Get All Direct Deposit",
    description:
      "Get All Direct Deposit returns main direct deposit and all additional direct deposits for the selected employee.",
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
      `/companies/${companyId}/employees/${employeeId}/directDeposit`,
    );
    return {
      data,
    };
  },
});
