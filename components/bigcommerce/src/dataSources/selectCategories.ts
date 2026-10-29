import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { bigCommerceConnection, storeHash } from "../inputs";

export const selectCategories = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Categories",
    description: "Select a category from a specific store.",
  },
  inputs: { bigCommerceConnection, storeHash },
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(
      params.bigCommerceConnection,
      false,
    );

    const endpoint = `/stores/${params.storeHash}/v3/catalog/categories`;

    const { data } = await client.get(endpoint);

    return {
      result: data.map((category: { id: string; name: string }) => ({
        key: category.id,
        label: category.name,
      })),
    };
  },
});
