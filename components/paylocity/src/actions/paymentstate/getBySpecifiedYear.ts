import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import { companyId, connectionInput, employeeId, year } from "../../inputs";

export const getPayStatementDetailsForTheSpecifiedYear = action({
  display: {
    label: "Get Pay Statement Details for the Specified Year",
    description:
      "Get pay statement details API will return employee pay statement details data currently available in Web Pay for the specified year.",
  },
  inputs: {
    connectionInput,
    employeeId,
    companyId,
    year,
  },
  perform: async (
    context,
    { connectionInput, employeeId, companyId, year },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/employees/${employeeId}/paystatement/details/${year}`,
    );
    return {
      data,
    };
  },
});
