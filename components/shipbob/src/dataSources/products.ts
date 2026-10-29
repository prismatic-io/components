import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Product {
  id: number;
  reference_id: string;
  sku: string;
  name: string;
  barcode: string;
  gtin: string;
  upc: string;
  unit_price: number;
}

export const products = dataSource({
  display: {
    label: "Fetch Products",
    description: "Fetch an array of Products",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Product[]>("/product", {
      params: {
        Limit: 250,
        ActiveStatus: "Active",
        BundleStatus: "Any",
      },
    });
    const result = data.map<Element>((product) => ({
      label:
        product.name || product.reference_id || product.sku || product.barcode,
      key: product.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "TShirtBlueM", key: "0" },
      { label: "Other", key: "47012" },
    ],
  },
});
