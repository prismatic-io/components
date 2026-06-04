import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { WebhookVersion } from "../constants";

interface Product {
  id: number;
  name: string;
}

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a Product from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Product>(client, "products", {}, true);

    const objects = sortRecords(data, "name").map<Element>((product) => ({
      key: product.id.toString(),
      label: product.name,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Product", key: "1" }],
  },
});
