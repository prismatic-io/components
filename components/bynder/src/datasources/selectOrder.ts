import { dataSource, type Element } from "@prismatic-io/spectral";
import { createApiClient } from "../client";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from the list of orders available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createApiClient(connection, false);
    const { data } = await client.get("/store/order");

    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "order_ref").map<Element>(
        (order) => ({
          key: order.id.toString(),
          label: `${order.order_ref} (ID: ${order.id})`,
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
        key: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
        label: "NA13334 (ID: A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890)",
      },
    ],
  },
});
