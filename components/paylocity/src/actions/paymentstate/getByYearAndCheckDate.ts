import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  checkDate,
  companyId,
  connectionInput,
  employeeId,
  year,
} from "../../inputs";

export const getPayStatementDetailsByYearAndCheckDate = action({
  display: {
    label: "Get Pay Statement Details by Year and Check Date",
    description:
      "Get pay statement details API will return employee pay statement detail data currently available in Web Pay for the specified year and check date.",
  },
  inputs: {
    connectionInput,
    employeeId,
    companyId,
    year,
    checkDate,
  },
  perform: async (
    context,
    { connectionInput, employeeId, companyId, checkDate, year },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/employees/${employeeId}/paystatement/details/${year}/${checkDate}`,
    );
    return {
      data,
    };
  },
});
