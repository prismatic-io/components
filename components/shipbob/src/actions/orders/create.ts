import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createOrderExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  financials,
  gift_message,
  location_id,
  order_number,
  products,
  purchase_date,
  recipient,
  reference_id,
  retailer_program_data,
  shipbob_channel_id,
  shipping_method,
  shipping_terms,
  tags,
  type,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Create a new Order",
  },
  perform: async (
    context,
    { connection, version, shipbob_channel_id, ...inputs },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const body = generatePayload(inputs);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.post(`/order`, body, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    shipbob_channel_id: { ...shipbob_channel_id, required: true },
    shipping_method,
    recipient,
    products,
    reference_id,
    shipping_terms,
    retailer_program_data,
    financials,
    order_number,
    type,
    tags,
    purchase_date,
    location_id,
    gift_message,
  },
  examplePayload: createOrderExamplePayload,
});
