import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { getOrderResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Retrieve an existing order",
  },
  inputs: {
    id: {
      ...id,
      label: "Order ID",
      comments:
        "The ID of the order to retrieve. Either id or orderNumber is required",
      required: false,
      dataSource: "selectOrder",
    },
    orderNumber: {
      ...id,
      label: "Order Number",
      comments:
        "The order number of the order to retrieve. Either id or orderNumber is required",
      required: false,
    },
    connection,
  },
  perform: async (context, { connection, id, orderNumber }) => {
    const client = createApiClient(connection, context.debug.enabled);
    if ((!id && !orderNumber) || (id && orderNumber)) {
      throw new Error("Either id or Order Number is required, but not both.");
    }
    if (id) {
      const { data } = await client.get(`/store/order/${id}/products`);
      return { data };
    }
    const { data } = await client.get(`/store/order/${orderNumber}/products`);
    return { data };
  },
  examplePayload: {
    data: getOrderResponse,
  },
});
