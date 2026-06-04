import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listPaymentsExamplePayload } from "../../examplePayloads";
import { listPaymentsInputs } from "../../inputs";

export const listPayments = action({
  display: {
    label: "List Payments",
    description: "Retrieves a list of payments taken by the account making the request.",
  },
  perform: async (
    context,
    {
      squareConnection,
      beginTime,
      endTime,
      sortOrder,
      cursor,
      locationId,
      total,
      last4,
      cardBrand,
      limit,
    },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const queryParams = {
      begin_time: beginTime,
      end_time: endTime,
      sort_order: sortOrder,
      cursor: cursor,
      location_id: locationId,
      total: total,
      last_4: last4,
      card_brand: cardBrand,
      limit: limit,
    };

    const response = await client.get("/v2/payments", {
      params: queryParams,
    });

    return {
      data: response.data,
    };
  },
  inputs: listPaymentsInputs,
  examplePayload: listPaymentsExamplePayload,
});
