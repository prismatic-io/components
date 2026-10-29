import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, storeId } from "../inputs";
import type { MailchimpCustomer } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a Mailchimp e-commerce customer",
  },
  inputs: {
    connection: connectionInput,
    storeId: { ...storeId, required: true, dataSource: undefined },
  },
  perform: async (_context, { connection, storeId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpCustomer>({
      client,
      endpoint: `/ecommerce/stores/${storeId}/customers`,
      dataKey: "customers",
      fetchAll: true,
    });

    const customers = data.customers as MailchimpCustomer[];
    const result = customers.map<Element>((customer) => ({
      label: customer.email_address,
      key: customer.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});

export default selectCustomer;
