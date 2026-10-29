import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectBrand = dataSource({
  display: {
    label: "Select Brand",
    description: "Select a brand from the list of brands available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/brands");

    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "name").map<Element>(
        (brand) => ({
          key: brand.id.toString(),
          label: `${brand.name} (ID: ${brand.id})`,
        }),
      );

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        key: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
        label: "Bynder Brand Portal (ID: A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890)",
      },
    ],
  },
});
