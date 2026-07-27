import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSalesShipmentExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
export const listSaleShipments = action({
  display: {
    label: "List Sales Shipments",
    description:
      "List all sales shipments objects from your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      companyId,
      fetchAll,
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
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $format,
      $expand,
      $count,
      $filter,
      $skipToken,
      $skip,
      $search,
      $select,
      $orderBy,
    };
    return await paginateResults<
      (typeof listSalesShipmentExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/salesShipments`,
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
  examplePayload: listSalesShipmentExamplePayload,
});
