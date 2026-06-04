import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkerPaymentDistributionResponse } from "../../examplePayloads";
import { $select, connection } from "../../inputs";

export const getWorkerPaymentDistributionsMeta = action({
  display: {
    label: "Get Worker Payment Distributions Meta",
    description: "Returns a worker's pay distribution records metadata",
  },
  inputs: {
    $select,
    connection,
  },
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
  examplePayload: {
    data: getWorkerPaymentDistributionResponse,
  },
});
