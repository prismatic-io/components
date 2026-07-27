import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseReceiptsExamplePayload as examplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listPurchaseReceiptsInputs as inputs } from "../../inputs/purchaseReceipts/listPurchaseReceiptsInputs";
export const listPurchaseReceipts = action({
  display: {
    label: "List Purchase Receipts",
    description:
      "List all purchase receipt objects in your Business Central Organization.",
  },
  perform: async (
    context,
    {
      companyId,
      connection,
      fetchAll,
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
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $orderBy,
      $format,
      $expand,
      $count,
      $filter,
      $skipToken,
      $skip,
      $search,
      $select,
    };
    return await paginateResults<
      (typeof examplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/purchaseReceipts`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  inputs,
  examplePayload,
});
