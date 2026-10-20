import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkerPaymentDistributionsMetaExamplePayload } from "../../examplePayloads";
import { getWorkerPaymentDistributionsMetaInputs } from "../../inputs";
import { getWorkerPaymentDistributionsMetaOutputSchema } from "../../outputSchemas";
export const getWorkerPaymentDistributionsMeta = action({
  display: {
    label: "Get Worker Payment Distributions Meta",
    description: "Returns a worker's pay distribution records metadata",
  },
  inputs: getWorkerPaymentDistributionsMetaInputs,
  performSafety: "safe",
  perform: async (context, { connection, $select }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      "/events/payroll/v1/worker.pay-distribution.change/meta",
      {
        params: {
          $select,
        },
      },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerPaymentDistributionsMetaOutputSchema,
  }),
  examplePayload: getWorkerPaymentDistributionsMetaExamplePayload,
});
