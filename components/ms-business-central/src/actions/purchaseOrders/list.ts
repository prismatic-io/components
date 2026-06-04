import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseOrdersExamplePayload as examplePayload } from "../../examplePayloads";
import { listPurchaseOrdersInputs as inputs } from "../../inputs/purchaseOrders/listPurchaseOrdersInputs";
import type { MultipleItemsResponse, PurchaseOrder } from "../../interfaces";

export const listPurchaseOrders = action({
  display: {
    label: "List Purchase Orders",
    description: "List all purchase order objects in your Business Central Organization.",
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

    const { data } = await client.get<MultipleItemsResponse<PurchaseOrder[]>>(
      `/companies(${companyId})/purchaseOrders`,
      {
        params,
      },
    );

    return { data };
  },
  inputs,
  examplePayload,
});
