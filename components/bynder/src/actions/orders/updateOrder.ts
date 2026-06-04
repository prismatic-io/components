import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { genericCreateResponse } from "../../examplePayloads";
import {
  connection,
  id,
  messsage,
  orderStatus,
  trackingnumber,
} from "../../inputs";

export const updateOrder = action({
  display: {
    label: "Update Order",
    description: "Update an existing order",
  },
  inputs: {
    id: {
      ...id,
      label: "Order ID",
      comments: "The ID of the order to update",
      dataSource: "selectOrder",
    },
    status: orderStatus,
    messsage,
    trackingnumber,
    connection,
  },
  perform: async (
    context,
    { connection, id, messsage, status, trackingnumber },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.post(`/store/order/${id}`, {
      status,
      messsage,
      trackingnumber,
    });
    return { data };
  },
  examplePayload: {
    data: genericCreateResponse,
  },
});
