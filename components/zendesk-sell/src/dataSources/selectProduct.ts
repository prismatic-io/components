import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectProductInputs } from "../inputs/dataSources/product";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a product from your Zendesk Sell account.",
  },
  inputs: selectProductInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/products", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((product: any) => {
          return {
            key: product.data.id.toString(),
            label: product.data.name,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Product", key: "12345" }],
  },
});
