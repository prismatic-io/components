import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWarehouseCatalogExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listWarehousesCatalog = action({
  display: {
    label: "Get Warehouses Catalog",
    description:
      "Returns a list of all available Warehouses in the Segment catalog.",
  },
  inputs: {
    connectionInput,
    region,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, fetchAll, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/catalog/warehouses",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listWarehouseCatalogExamplePayload,
  },
});
