import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesOrdersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
export const listSalesOrders = action({
  display: {
    label: "List Sales Orders",
    description:
      "List all sales orders objects in your Business Central Organization.",
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
      (typeof listSalesOrdersExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/salesOrders`,
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
  examplePayload: listSalesOrdersExamplePayload,
});
