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
      (typeof listVendorsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/vendors`,
      params,
      fetchAll,
      pageSize: odataQueryParams.$top,
    });
  },
  examplePayload: listVendorsExamplePayload,
});
