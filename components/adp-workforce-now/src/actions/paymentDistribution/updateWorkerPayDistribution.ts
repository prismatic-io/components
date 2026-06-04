import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPaymentDistributionMetaResponse } from "../../examplePayloads";
import {
  aoid,
  connection,
  paymentDistribution,
  workAssignmentId,
} from "../../inputs";

export const updateWorkerPayDistribution = action({
  display: {
    label: "Update Worker Pay Distribution",
    description:
      "Replaces an employee's existing Direct Deposit records with an updated collection",
  },
  inputs: {
    aoid,
    workAssignmentId,
    paymentDistribution,
    connection,
  },
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
  examplePayload: {
    data: getPaymentDistributionMetaResponse,
  },
});
