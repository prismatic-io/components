import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, storeId, orderId } from "../inputs";
import type { MailchimpOrderLineItem } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectOrderLineItem = dataSource({
  display: {
    label: "Select Order Line Item",
    description:
      "Select a line item from an order in a Mailchimp e-commerce store.",
  },
  inputs: {
    connection: connectionInput,
    storeId: { ...storeId, required: true, dataSource: undefined },
    orderId: { ...orderId, dataSource: undefined },
  },
  perform: async (_context, { connection, storeId, orderId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpOrderLineItem>({
      client,
      endpoint: `/ecommerce/stores/${storeId}/orders/${orderId}/lines`,
      dataKey: "lines",
      fetchAll: true,
    });

    const lines = data.lines as MailchimpOrderLineItem[];
    const result = lines
      .map<Element>((line) => ({
        label: line.product_title
          ? `${line.product_title} - ${line.product_variant_title || line.id}`
          : line.id.toString(),
        key: line.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "T-Shirt - Size L Blue",
        key: "line_abc123",
      },
    ],
  },
});

export default selectOrderLineItem;
