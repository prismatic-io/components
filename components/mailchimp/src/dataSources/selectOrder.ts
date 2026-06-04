import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, storeId } from "../inputs";
import type { MailchimpOrder } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from a Mailchimp e-commerce store.",
  },
  inputs: {
    connection: connectionInput,
    storeId: { ...storeId, required: true, dataSource: undefined },
  },
  perform: async (_context, { connection, storeId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpOrder>({
      client,
      endpoint: `/ecommerce/stores/${storeId}/orders`,
      dataKey: "orders",
      fetchAll: true,
    });

    const orders = data.orders as MailchimpOrder[];
    const result = orders
      .map<Element>((order) => ({
        label: `${order.id} - ${order.customer?.email_address || "Unknown"}`,
        key: order.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "order_12345 - john.doe@example.com",
        key: "order_12345",
      },
    ],
  },
});

export default selectOrder;
