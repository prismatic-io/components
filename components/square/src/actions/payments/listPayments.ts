import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listPaymentsExamplePayload } from "../../examplePayloads";
import { listPaymentsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listPayments = action({
  display: {
    label: "List Payments",
    description:
      "Retrieves a list of payments taken by the account making the request.",
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
      total,
      last4,
      cardBrand,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/payments",
      "payments",
      {
        initialCursor: pagination.cursor,
        additionalParams: {
          begin_time: beginTime,
          end_time: endTime,
          sort_order: sortOrder,
          location_id: locationId,
          total: total,
          last_4: last4,
          card_brand: cardBrand,
          limit: pagination.limit,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listPaymentsInputs,
  examplePayload: listPaymentsExamplePayload,
});
