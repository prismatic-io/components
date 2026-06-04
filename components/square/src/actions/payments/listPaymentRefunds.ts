import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listPaymentRefundsExamplePayload } from "../../examplePayloads";
import { listPaymentRefundsInputs } from "../../inputs";

export const listPaymentRefunds = action({
  display: {
    label: "List Payment Refunds",
    description: "Retrieves a list of refunds for the account making the request.",
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
      status,
      sourceType,
      limit,
    },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get("/v2/refunds", {
      params: {
        begin_time: beginTime,
        end_time: endTime,
        sort_order: sortOrder,
        cursor: cursor,
        location_id: locationId,
        status: status,
        source_type: sourceType,
        limit: limit,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: listPaymentRefundsInputs,
  examplePayload: listPaymentRefundsExamplePayload,
});
