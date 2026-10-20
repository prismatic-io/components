import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompanyCodesExamplePayload } from "../../examplePayloads";
import { listCompanyCodesInputs } from "../../inputs";
import { listCompanyCodesOutputSchema } from "../../outputSchemas";
export const listCompanyCodes = action({
  display: {
    label: "List Company Codes",
    description: "Returns a list of company codes",
  },
  inputs: listCompanyCodesInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCompanyCodesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompanyCodesOutputSchema,
  }),
  examplePayload: listCompanyCodesExamplePayload,
});
