import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { company, connection, site } from "../inputs/general";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a product from a dropdown list.",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ id: number; name: string; code: string }[]>("/products");

    const objects = data.map<Element>((product) => ({
      key: util.types.toString(product.id),
      label: `${product.name} (${product.code})`,
    }));

    return { result: objects.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")) };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: {
    result: [{ label: "Whiteboard - Drywipe (BOARD001)", key: "35738" }],
  },
});
