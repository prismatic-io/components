import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Inventory {
  inventoryId: number;
  name: string;
}

export const inventory = dataSource({
  display: {
    label: "Fetch Inventory",
    description: "Fetch an array of Inventories",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Inventory[]>("/inventory", {
      params: {
        Limit: 250,
        IsActive: true,
      },
    });
    const result = data.map<Element>((inventory) => ({
      label: inventory.name,
      key: inventory.inventoryId.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "TShirtBlueM", key: "0" },
      { label: "Medium Blue T-Shirt", key: "47012" },
    ],
  },
});
