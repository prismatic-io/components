import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectWarehouseMetadata = dataSource({
  display: {
    label: "Select Warehouse Metadata",
    description:
      "A picklist of available Warehouse types from the Segment catalog.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/catalog/warehouses", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.warehousesCatalog) {
      const result = data.data.warehousesCatalog
        .map((item: { id: string; name: string }) => ({
          label: item.name,
          key: item.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        );
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Postgres",
        key: "55d3d3aea3c",
      },
    ],
  },
});
