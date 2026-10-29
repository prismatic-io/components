import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateWorkerPayDistributionExamplePayload } from "../../examplePayloads";
import { updateWorkerPayDistributionInputs } from "../../inputs";
import { updateWorkerPayDistributionOutputSchema } from "../../outputSchemas";

export const updateWorkerPayDistribution = action({
  display: {
    label: "Update Worker Pay Distribution",
    description:
      "Replaces an employee's existing Direct Deposit records with an updated collection",
  },
  inputs: updateWorkerPayDistributionInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, aoid, workAssignmentId, paymentDistribution },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/payroll/v1/worker.pay-distribution.change",
      {
        events: [
          {
            data: {
              eventContext: {
                worker: {
                  associateOID: aoid,
                },
                payDistribution: {
                  itemID: workAssignmentId,
                },
              },
              transform: paymentDistribution,
            },
          },
        ],
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    updateWorkerPayDistributionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWorkerPayDistributionOutputSchema,
  }),
  examplePayload: updateWorkerPayDistributionExamplePayload,
});
