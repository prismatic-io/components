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
    { companyId, connection, fetchAll, odataQueryParams },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $search: odataQueryParams.$search,
      $skip: odataQueryParams.$skip,
      $skipToken: odataQueryParams.$skipToken,
      $filter: odataQueryParams.$filter,
      $count: odataQueryParams.$count,
      $expand: odataQueryParams.$expand,
      $format: odataQueryParams.$format,
      $orderBy: odataQueryParams.$orderBy,
      $select: odataQueryParams.$select,
    };
    return await paginateResults<
      (typeof listPurchaseInvoicesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/purchaseInvoices`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  examplePayload: listPurchaseInvoicesExamplePayload,
});
