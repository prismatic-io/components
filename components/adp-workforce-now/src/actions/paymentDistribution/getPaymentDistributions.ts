import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPaymentDistributionMetaResponse } from "../../examplePayloads";
import { $filter, $select, aoid, connection } from "../../inputs";

export const getPaymentDistributions = action({
  display: {
    label: "Get Worker Payment Distributions",
    description: "Returns a worker's pay distribution records",
  },
  inputs: {
    aoid,
    $select,
    $filter,
    connection,
  },
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
  examplePayload: {
    data: getPaymentDistributionMetaResponse,
  },
});
