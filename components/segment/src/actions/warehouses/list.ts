import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listWarehousesExamplePayload } from "../../examplePayloads";

export const listWarehouses = action({
  display: {
    label: "List Warehouses",
    description: "Returns a list of Warehouses.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get("/warehouses", {
      params: {
        pagination: {
          count: count || undefined,
          cursor: cursor || undefined,
        },
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listWarehousesExamplePayload,
  },
});
