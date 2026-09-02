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
      endpoint: `/companies(${companyId})/purchaseReceiptLines`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  inputs,
  examplePayload,
});
