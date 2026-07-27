import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseInvoicesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listPurchaseInvoicesInputs } from "../../inputs/purchaseInvoices";
export const listPurchaseInvoices = action({
  display: {
    label: "List Purchase Invoices",
    description:
      "Retrieve all purchase invoices in your Business Central organization.",
  },
  inputs: listPurchaseInvoicesInputs,
  perform: async (
    context,
    {
      $search,
      companyId,
      connection,
      fetchAll,
      $skip,
      $skipToken,
      $top,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $search,
      $skip,
      $skipToken,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    };
    return await paginateResults<
      (typeof listPurchaseInvoicesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/purchaseInvoices`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  examplePayload: listPurchaseInvoicesExamplePayload,
});
