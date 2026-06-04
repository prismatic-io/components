import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompanyCodesResponse } from "../../examplePayloads";
import { $filter, connection } from "../../inputs";

export const listCompanyCodes = action({
  display: {
    label: "List Company Codes",
    description: "Returns a list of company codes",
  },
  inputs: {
    $filter,
    connection,
  },
  perform: async (context, { connection, $filter }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      "/codelists/payroll/v4/payroll-instruction-management/pay-groups/wfn/1",
      {
        params: {
          $filter,
        },
      },
    );
    return { data };
  },
  examplePayload: {
    data: listCompanyCodesResponse,
  },
});
