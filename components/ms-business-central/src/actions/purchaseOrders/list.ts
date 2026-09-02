import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseOrdersExamplePayload as examplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listPurchaseOrdersInputs as inputs } from "../../inputs/purchaseOrders/listPurchaseOrdersInputs";
export const listPurchaseOrders = action({
  display: {
    label: "List Purchase Orders",
    description:
      "List all purchase order objects in your Business Central Organization.",
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
    return await paginateResults<
      (typeof examplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/purchaseOrders`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  inputs,
  examplePayload,
});
