import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../../inputs/general";
import type { Customer, MultipleItemsResponse } from "../../interfaces";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description:
      "Retrieve the properties and relationships of all customer objects in your Business Central organization.",
  },
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

    const { data } = await client.get<MultipleItemsResponse<Customer[]>>(
      `/companies(${companyId})/customers`,
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
  examplePayload: listCustomersExamplePayload,
});
