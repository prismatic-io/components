import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseReceiptsExamplePayload as examplePayload } from "../../examplePayloads";
import { listPurchaseReceiptsInputs as inputs } from "../../inputs/purchaseReceipts/listPurchaseReceiptsInputs";
import type { MultipleItemsResponse, PurchaseReceipt } from "../../interfaces";

export const listPurchaseReceipts = action({
  display: {
    label: "List Purchase Receipts",
    description: "List all purchase receipt objects in your Business Central Organization.",
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

    const { data } = await client.get<MultipleItemsResponse<PurchaseReceipt[]>>(
      `/companies(${companyId})/purchaseReceipts`,
      {
        params,
      },
    );

    return { data };
  },
  inputs,
  examplePayload,
});
