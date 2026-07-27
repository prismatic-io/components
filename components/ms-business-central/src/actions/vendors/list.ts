import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listVendorsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { listVendorsInputs } from "../../inputs/vendors";
export const listVendors = action({
  display: {
    label: "List Vendors",
    description: "Retrieve all vendors in your Business Central organization.",
  },
  inputs: listVendorsInputs,
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
      (typeof listVendorsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/vendors`,
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  examplePayload: listVendorsExamplePayload,
});
