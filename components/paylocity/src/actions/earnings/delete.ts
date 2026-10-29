import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  earningCode,
  employeeId,
  startDate,
} from "../../inputs";

export const deleteEarningsByEarningCodeAndStartDate = action({
  display: {
    label: "Delete Earnings by Earning Code and Start Date",
    description: "Delete Earning by Earning Code and Start Date",
  },
  inputs: {
    connectionInput,
    companyId,
    employeeId,
    earningCode,
    startDate,
  },
  perform: async (
    context,
    { connectionInput, companyId, employeeId, earningCode, startDate },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(
      `/companies/${companyId}/employees/${employeeId}/earnings/${earningCode}/${startDate}`,
    );
    return {
      data,
    };
  },
});
