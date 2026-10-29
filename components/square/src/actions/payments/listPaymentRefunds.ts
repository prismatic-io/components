import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listPaymentRefundsExamplePayload } from "../../examplePayloads";
import { listPaymentRefundsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listPaymentRefunds = action({
  display: {
    label: "List Payment Refunds",
    description:
      "Retrieves a list of refunds for the account making the request.",
  },
  perform: async (
    context,
    {
      squareConnection,
      fetchAll,
      beginTime,
      endTime,
      sortOrder,
      pagination = {},
      locationId,
      status,
      sourceType,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/refunds",
      "refunds",
      {
        initialCursor: pagination.cursor,
        additionalParams: {
          begin_time: beginTime,
          end_time: endTime,
          sort_order: sortOrder,
          location_id: locationId,
          status: status,
          source_type: sourceType,
          limit: pagination.limit,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listPaymentRefundsInputs,
  examplePayload: listPaymentRefundsExamplePayload,
});
