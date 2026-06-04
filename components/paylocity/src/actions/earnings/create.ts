import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  earningCode,
  earningsInput,
  employeeId,
  startDate,
} from "../../inputs";

export const createUpdateEarning = action({
  display: {
    label: "Create/Update Earning",
    description:
      "Create/Update Earning API sends new or updated employee earnings information directly to Web Pay.",
  },
  inputs: {
    connectionInput,
    companyId,
    employeeId,
    earningCode,
    startDate,
    earningsInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      companyId,
      employeeId,
      earningCode,
      startDate,
      earningsInput,
    },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.put(
      `/companies/${companyId}/employees/${employeeId}/earnings`,
      {
        earningCode,
        startDate,
        ...earningsInput,
      },
    );
    return {
      data,
    };
  },
});
