import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesShipmentLinesExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../../inputs/general";
import type { MultipleItemsResponse, SalesShipmentLine } from "../../interfaces";

export const listSalesShipmentLines = action({
  display: {
    label: "List Sales Shipment Line Items",
    description: "Lists all  sales shipment line objects in your Business Central organization.",
  },
  perform: async (
    context,
    {
      companyId,

      connection,
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

    const { data } = await client.get<MultipleItemsResponse<SalesShipmentLine[]>>(
      `/companies(${companyId})/salesShipmentLines`,
      {
        params,
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...odataParams,
    companyId,
  },
  examplePayload: listSalesShipmentLinesExamplePayload,
});
