import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  employeeId,
  sensitiveDataInput,
} from "../../inputs";

export const createUpdateSensitiveData = action({
  display: {
    label: "Create/Update Sensitive Data",
    description:
      "Sends new or updated employee sensitive data information directly to Web Pay.",
  },
  inputs: {
    connectionInput,
    employeeId,
    companyId,
    sensitiveDataInput,
  },
  perform: async (
    context,
    { connectionInput, employeeId, companyId, sensitiveDataInput },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.put(
      `/companies/${companyId}/employees/${employeeId}/sensitivedata`,
      {
        ...sensitiveDataInput,
      },
    );
    return {
      data,
    };
  },
});
