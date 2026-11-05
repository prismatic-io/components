import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { fetchAllData } from "../../util";
import { defaultPaginationInputs, connection } from "../../inputs/general";
import { listWarehousesExamplePayload } from "../../examplePayloads/warehouses";

export const listWarehouses = action({
  display: {
    label: "List Warehouses",
    description:
      "Retrieve a collection of Warehouses with all or some selected properties in the given order by specifying the given filter condition.",
  },
  inputs: {
    connection,
    ...defaultPaginationInputs,
  },
  perform: async (
    context,
    { connection, customQueryParams, $filter, $orderby, $select, $skip, $top, fetchAll },
  ) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const data = await fetchAllData(
      client,
      "Warehouses",
      {
        ...customQueryParams,
        $filter,
        $orderby,
        $select,
        $skip,
        $top,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: listWarehousesExamplePayload,
});
