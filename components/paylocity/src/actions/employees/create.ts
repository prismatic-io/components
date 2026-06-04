import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  employeeInput,
  firstName,
  lastName,
} from "../../inputs";

export const createEmployee = action({
  display: {
    label: "Create Employee",
    description:
      "New Employee API sends new employee data directly to Web Pay.",
  },
  inputs: {
    connectionInput,
    companyId,
    firstName,
    lastName,
    employeeInput,
  },
  perform: async (
    context,
    { connectionInput, companyId, employeeInput, firstName, lastName },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.post(`/companies/${companyId}/employees`, {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      ...employeeInput,
    });
    return {
      data,
    };
  },
});
