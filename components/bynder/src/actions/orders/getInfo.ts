import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { getOrderInfoResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getOrderInfo = action({
  display: {
    label: "Get Order Info",
    description: "Retrieve information on an order",
  },
  inputs: {
    id: {
      ...id,
      label: "Order ID",
      comments: "The ID of the order to retrieve",
      dataSource: "selectOrder",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(`/store/order/${id}`);
    return { data };
  },
  examplePayload: {
    data: getOrderInfoResponse,
  },
});
