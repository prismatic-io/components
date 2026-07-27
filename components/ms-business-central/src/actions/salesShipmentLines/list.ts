import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesShipmentLinesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
export const listSalesShipmentLines = action({
  display: {
    label: "List Sales Shipment Line Items",
    description:
      "Lists all  sales shipment line objects in your Business Central organization.",
  },
  perform: async (
    context,
    {
      companyId,
      connection,
      fetchAll,
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
      (typeof listSalesShipmentLinesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/salesShipmentLines`,
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
  examplePayload: listSalesShipmentLinesExamplePayload,
});
