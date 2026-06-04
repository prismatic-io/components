import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { fetchAllData } from "../../util";
import { defaultPaginationInputs, connection } from "../../inputs/general";
import { listPriceListsExamplePayload } from "../../examplePayloads/priceLists";

export const listPriceLists = action({
  display: {
    label: "List Price Lists",
    description: "Retrieve a collection of PriceLists with all or some selected properties.",
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
      "PriceLists",
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
  examplePayload: listPriceListsExamplePayload,
});
