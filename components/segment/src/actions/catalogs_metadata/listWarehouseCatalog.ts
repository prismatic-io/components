import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listWarehouseCatalogExamplePayload } from "../../examplePayloads";

export const listWarehousesCatalog = action({
  display: {
    label: "Get Warehouses Catalog",
    description:
      "Returns a list of all available Warehouses in the Segment catalog.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/catalog/warehouses`, {
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
    data: listWarehouseCatalogExamplePayload,
  },
});
