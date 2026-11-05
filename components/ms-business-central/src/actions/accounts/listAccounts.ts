import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listAccountsExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../../inputs/general";
import type { Account, MultipleItemsResponse } from "../../interfaces";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description:
      "Retrieve the properties and relationships of all account objects in your Business Central organization.",
  },
  perform: async (
    context,
    {
      $search,

      $top,
      connection,
      $skip,
      $skipToken,
      $select,
      $orderBy,
      $format,
      $expand,
      $count,
      $filter,
      companyId,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
      $search,
      $top,
      $skip,
      $skipToken,
      $select,
      $orderBy,
      $format,
      $expand,
      $count,
      $filter,
    };

    const { data } = await client.get<MultipleItemsResponse<Account[]>>(
      `/companies(${companyId})/accounts`,
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
  examplePayload: listAccountsExamplePayload,
});
