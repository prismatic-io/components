import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesOrdersExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../../inputs/general";
import type { MultipleItemsResponse, SalesOrder } from "../../interfaces";

export const listSalesOrders = action({
  display: {
    label: "List Sales Orders",
    description: "List all sales orders objects in your Business Central Organization.",
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

    const { data } = await client.get<MultipleItemsResponse<SalesOrder[]>>(
      `/companies(${companyId})/salesOrders`,
      {
        params,
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    ...odataParams,
  },
  examplePayload: listSalesOrdersExamplePayload,
});
