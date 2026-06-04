import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { fetchAllData } from "../../util";
import { defaultPaginationInputs, connection } from "../../inputs/general";

export const listPurchaseOrders = action({
  display: {
    label: "List Purchase Orders",
    description: "Retrieve a collection of Purchase Orders with all or some selected properties.",
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
      "PurchaseOrders",
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
});
