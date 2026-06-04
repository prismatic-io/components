import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesShipmentExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../../inputs/general";
import type { MultipleItemsResponse, SaleShipment } from "../../interfaces";

export const listSaleShipments = action({
  display: {
    label: "List Sales Shipments",
    description: "List all sales shipments objects from your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      companyId,
      $format,
      $expand,
      $count,
      $filter,
      $top,
      $skipToken,
      $skip,
      $search,
      $select,
      $orderBy,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
      $format,
      $expand,
      $count,
      $filter,
      $top,
      $skipToken,
      $skip,
      $search,
      $select,
      $orderBy,
    };

    const { data } = await client.get<MultipleItemsResponse<SaleShipment[]>>(
      `/companies(${companyId})/salesShipments`,
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
  examplePayload: listSalesShipmentExamplePayload,
});
