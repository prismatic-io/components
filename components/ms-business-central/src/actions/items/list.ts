import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listItemsInputs as inputs } from "../../inputs/items/listItemsInputs";
import type { Item, MultipleItemsResponse } from "../../interfaces";


export const listItems = action({
  display: {
    label: "List Items",
    description: "List all item objects from your Business Central Organization.",
  },
  perform: async (
    context,
    {
      companyId,

      $orderBy,
      connection,
      $format,
      $expand,
      $count,
      $filter,
      $top,
      $skipToken,
      $skip,
      $search,
      $select,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
      $orderBy,
      $format,
      $expand,
      $count,
      $filter,
      $top,
      $skipToken,
      $skip,
      $search,
      $select,
    };

    const { data } = await client.get<MultipleItemsResponse<Item[]>>(
      `/companies(${companyId})/items`,
      {
        params,
      },
    );

    return { data };
  },
  inputs,
  
});
