import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWarehousesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listWarehouses = action({
  display: {
    label: "List Warehouses",
    description: "Returns a list of Warehouses.",
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
      endpoint: "/warehouses",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listWarehousesExamplePayload,
  },
});
