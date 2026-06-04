import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseReceiptLinesExamplePayload as examplePayload } from "../../examplePayloads";
import { listPurchaseReceiptLinesInputs as inputs } from "../../inputs/purchaseReceiptLines/listPurchaseReceiptLinesInputs";
import type { MultipleItemsResponse, PurchaseReceiptLine } from "../../interfaces";

export const listPurchaseReceiptLines = action({
  display: {
    label: "List Purchase Receipt Lines",
    description: "List all purchase receipt line objects in your Business Central Organization.",
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

    const { data } = await client.get<MultipleItemsResponse<PurchaseReceiptLine[]>>(
      `/companies(${companyId})/purchaseReceiptLines`,
      {
        params,
      },
    );

    return { data };
  },
  inputs,
  examplePayload,
});
