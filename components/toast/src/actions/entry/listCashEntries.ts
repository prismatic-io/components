import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listCashEntriesExamplePayload as examplePayload } from "../../examplePayloads";
import { listCashEntriesInputs as inputs } from "../../inputs/entry";

export const listCashEntries = action({
  display: {
    label: "List Cash Entries",
    description:
      "Returns information about cash added to or removed from a cash drawer or other cash storage device.",
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

    const { data } = await client.get(`/cashmgmt/v1/entries`, {
      params: {
        businessDate,
      },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
