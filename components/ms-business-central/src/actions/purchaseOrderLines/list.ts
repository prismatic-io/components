import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseOrderLinesExamplePayload as examplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listPurchaseOrderLinesInputs as inputs } from "../../inputs/purchaseOrderLines/listPurchaseOrderLinesInputs";
export const listPurchaseOrderLines = action({
  display: {
    label: "List Purchase Order Lines",
    description:
      "List all purchase order line objects in your Business Central Organization.",
  },
  perform: async (
    context,
    { companyId, purchaseOrderId, connection, fetchAll, odataQueryParams },
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
      endpoint: `/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  inputs,
  examplePayload,
});
