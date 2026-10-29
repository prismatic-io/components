import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  employeeId,
  employeeInput,
  firstName,
  lastName,
} from "../../inputs";

export const updateEmployee = action({
  display: {
    label: "Update Employee",
    description:
      "Update Employee API will update existing employee data in WebPay.",
  },
  inputs: {
    connectionInput,
    companyId,
    employeeId,
    firstName,
    lastName,
    employeeInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      companyId,
      employeeInput,
      firstName,
      lastName,
      employeeId,
    },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.patch(
      `/companies/${companyId}/employees/${employeeId}`,
      {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        ...employeeInput,
      },
    );
    return {
      data,
    };
  },
});
