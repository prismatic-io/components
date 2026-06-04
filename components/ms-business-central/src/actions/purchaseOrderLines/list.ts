import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseOrderLinesExamplePayload as examplePayload } from "../../examplePayloads";
import { listPurchaseOrderLinesInputs as inputs } from "../../inputs/purchaseOrderLines/listPurchaseOrderLinesInputs";
import type { MultipleItemsResponse, PurchaseOrderLine } from "../../interfaces";

export const listPurchaseOrderLines = action({
  display: {
    label: "List Purchase Order Lines",
    description: "List all purchase order line objects in your Business Central Organization.",
  },
  perform: async (
    context,
    {
      companyId,
      purchaseOrderId,

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

    const { data } = await client.get<MultipleItemsResponse<PurchaseOrderLine[]>>(
      `/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines`,
      {
        params,
      },
    );

    return { data };
  },
  inputs,
  examplePayload,
});
