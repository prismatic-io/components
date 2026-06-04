import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  earningCode,
  employeeId,
  startDate,
} from "../../inputs";

export const getEarningsByEarningCodeAndStartDate = action({
  display: {
    label: "Get Earnings by Earning Code and Start Date",
    description:
      "Get Earnings returns the single earning with the provided earning code and start date for the selected employee.",
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

    const { data } = await client.get(
      `/companies/${companyId}/employees/${employeeId}/earnings/${earningCode}/${startDate}`,
    );
    return {
      data,
    };
  },
});
