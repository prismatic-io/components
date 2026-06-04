import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, storeId } from "../inputs";
import type { MailchimpProduct } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a Mailchimp e-commerce product",
  },
  inputs: {
    connection: connectionInput,
    storeId: { ...storeId, required: true, dataSource: undefined },
  },
  perform: async (_context, { connection, storeId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpProduct>({
      client,
      endpoint: `/ecommerce/stores/${storeId}/products`,
      dataKey: "products",
      fetchAll: true,
    });

    const products = data.products as MailchimpProduct[];
    const result = products.map<Element>((product) => ({
      label: product.title,
      key: product.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});

export default selectProduct;
