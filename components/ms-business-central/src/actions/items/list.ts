import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { paginateResults } from "ms-utils";
import { listItemsInputs as inputs } from "../../inputs/items/listItemsInputs";
export const listItems = action({
  display: {
    label: "List Items",
    description:
      "List all item objects from your Business Central Organization.",
  },
  perform: async (
    context,
    { companyId, connection, fetchAll, odataQueryParams },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $orderBy: odataQueryParams.$orderBy,
      $format: odataQueryParams.$format,
      $expand: odataQueryParams.$expand,
      $count: odataQueryParams.$count,
      $filter: odataQueryParams.$filter,
      $skipToken: odataQueryParams.$skipToken,
      $skip: odataQueryParams.$skip,
      $search: odataQueryParams.$search,
      $select: odataQueryParams.$select,
    };
    return await paginateResults({
      client,
      endpoint: `/companies(${companyId})/items`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  inputs,
});
