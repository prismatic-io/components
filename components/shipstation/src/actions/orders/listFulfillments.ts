import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listFulfillmentsExamplePayload } from "../../examplePayloads";
import { listFulfillmentsInputs } from "../../inputs";

export const listFulfillments = action({
  display: {
    label: "List Fulfillments",
    description:
      "Retrieves a list of fulfillments based on specified criteria.",
  },
  perform: async (
    context,
    {
      connectionInput,
      fulfillmentId,
      orderId,
      pageFulfillments,
      pageSizeFulfillments,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const params = {
      fulfillmentId: Number(fulfillmentId),
      orderId: Number(orderId),
      page: Number(pageFulfillments),
      pageSize: Number(pageSizeFulfillments),
    };

    const { data } = await client.get("/fulfillments", { params });
    return { data };
  },
  inputs: listFulfillmentsInputs,
  examplePayload: listFulfillmentsExamplePayload,
});
