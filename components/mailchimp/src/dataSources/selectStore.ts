import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { MailchimpStore } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectStore = dataSource({
  display: {
    label: "Select Store",
    description: "Select a Mailchimp e-commerce store",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpStore>({
      client,
      endpoint: "/ecommerce/stores",
      dataKey: "stores",
      fetchAll: true,
    });

    const stores = data.stores as MailchimpStore[];
    const result = stores.map<Element>((store) => ({
      label: store.name,
      key: store.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});

export default selectStore;
