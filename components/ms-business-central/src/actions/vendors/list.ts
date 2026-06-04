import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listVendorsExamplePayload } from "../../examplePayloads";
import { listVendorsInputs } from "../../inputs/vendors";
import type { MultipleItemsResponse, Vendor } from "../../interfaces";

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

    const { data } = await client.get<MultipleItemsResponse<Vendor[]>>(
      `/companies(${companyId})/vendors`,
      {
        params,
      },
    );

    return { data };
  },
  examplePayload: listVendorsExamplePayload,
});
