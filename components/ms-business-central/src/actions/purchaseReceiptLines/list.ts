import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseReceiptLinesExamplePayload as examplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listPurchaseReceiptLinesInputs as inputs } from "../../inputs/purchaseReceiptLines/listPurchaseReceiptLinesInputs";
export const listPurchaseReceiptLines = action({
  display: {
    label: "List Purchase Receipt Lines",
    description:
      "List all purchase receipt line objects in your Business Central Organization.",
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
      endpoint: `/companies(${companyId})/purchaseReceiptLines`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  inputs,
  examplePayload,
});
