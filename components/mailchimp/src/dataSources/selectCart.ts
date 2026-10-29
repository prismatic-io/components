import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, storeId } from "../inputs";
import type { MailchimpCart } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectCart = dataSource({
  display: {
    label: "Select Cart",
    description: "Select a cart from a Mailchimp e-commerce store.",
  },
  inputs: {
    connection: connectionInput,
    storeId: { ...storeId, required: true, dataSource: undefined },
  },
  perform: async (_context, { connection, storeId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpCart>({
      client,
      endpoint: `/ecommerce/stores/${storeId}/carts`,
      dataKey: "carts",
      fetchAll: true,
    });

    const carts = data.carts as MailchimpCart[];
    const result = carts
      .map<Element>((cart) => ({
        label: `${cart.id} - ${cart.customer?.email_address || "Unknown"}`,
        key: cart.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "cart_abc123 - john.doe@example.com",
        key: "cart_abc123",
      },
    ],
  },
});

export default selectCart;
