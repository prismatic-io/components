import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listDepositsExamplePayload as examplePayload } from "../../examplePayloads";
import { listDepositsInputs as inputs } from "../../inputs/deposit";

export const listDeposits = action({
  display: {
    label: "List Deposits",
    description:
      "Returns an array of Deposit objects containing information about cash removed from a restaurant to be deposited in a bank or other financial institution during one business day.",
  },
  perform: async (
    context,
    { connection, restaurantExternalId, businessDate },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.get(`/cashmgmt/v1/deposits`, {
      params: { businessDate },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
