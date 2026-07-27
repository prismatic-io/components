import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesInvoicesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
export const listSalesInvoices = action({
  display: {
    label: "List Sales Invoices",
    description:
      "List all sales invoices objects in your Business Central Organization.",
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
      (typeof listSalesInvoicesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/salesInvoices`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  inputs: {
    connection: connectionInput,
    companyId,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listSalesInvoicesExamplePayload,
});
