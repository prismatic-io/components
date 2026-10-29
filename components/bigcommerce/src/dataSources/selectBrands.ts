import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { bigCommerceConnection, storeHash } from "../inputs";

export const selectBrands = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Brands",
    description: "Select a brand from a specific store.",
  },
  inputs: { bigCommerceConnection, storeHash },
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(
      params.bigCommerceConnection,
      false,
    );

    const endpoint = `/stores/${params.storeHash}/v3/catalog/brands`;

    const { data } = await client.get(endpoint);

    return {
      result: data.map((brand: { id: string; name: string }) => ({
        key: brand.id,
        label: brand.name,
      })),
    };
  },
});
