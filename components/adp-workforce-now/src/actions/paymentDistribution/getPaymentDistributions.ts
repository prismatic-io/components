import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPaymentDistributionsExamplePayload } from "../../examplePayloads";
import { getPaymentDistributionsInputs } from "../../inputs";
import { getPaymentDistributionsOutputSchema } from "../../outputSchemas";
export const getPaymentDistributions = action({
  display: {
    label: "Get Worker Payment Distributions",
    description: "Returns a worker's pay distribution records",
  },
  inputs: getPaymentDistributionsInputs,
  performSafety: "safe",
  perform: async (context, { connection, $select, aoid, $filter }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/payroll/v2/workers/${aoid}/pay-distributions`,
      {
        params: {
          $select,
          $filter,
        },
      },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPaymentDistributionsOutputSchema,
  }),
  examplePayload: getPaymentDistributionsExamplePayload,
});
