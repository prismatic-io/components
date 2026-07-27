import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "ms-utils";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
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
      (typeof listCustomersExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: `/companies(${companyId})/customers`,
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
  examplePayload: listCustomersExamplePayload,
});
