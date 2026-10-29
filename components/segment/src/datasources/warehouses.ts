import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const warehouses = dataSource({
  display: {
    label: "Fetch Warehouses",
    description: "Fetch an array of Warehouses",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get(`/warehouses`, {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.warehouses) {
      const result = data.warehouses.map(
        (warehouses: { id: string; metadata: { name: string } }) => ({
          label: warehouses.metadata.name,
          key: warehouses.id,
        }),
      );
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Postgres",
        key: "kjU72LCJexvrqL7G4TMHHN",
      },
    ],
  },
});
