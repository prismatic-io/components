import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listPurchaseInvoicesExamplePayload } from "../../examplePayloads";
import { listPurchaseInvoicesInputs } from "../../inputs/purchaseInvoices";
import type { MultipleItemsResponse, PurchaseInvoice } from "../../interfaces";

export const listPurchaseInvoices = action({
  display: {
    label: "List Purchase Invoices",
    description: "Retrieve all purchase invoices in your Business Central organization.",
  },
  inputs: listPurchaseInvoicesInputs,
  perform: async (
    context,
    {
      $search,
      companyId,
      connection,
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
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
      $search,
      $skip,
      $skipToken,
      $top,
      $filter,
      $count,
      $expand,
      $format,
      $orderBy,
      $select,
    };

    const { data } = await client.get<MultipleItemsResponse<PurchaseInvoice[]>>(
      `/companies(${companyId})/purchaseInvoices`,
      {
        params,
      },
    );

    return { data };
  },
  examplePayload: listPurchaseInvoicesExamplePayload,
});
