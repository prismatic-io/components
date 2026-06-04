import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getAccountExamplePayload } from "../../examplePayloads";
import { accountId, companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import type { Account } from "../../interfaces";

export const getAccount = action({
  display: {
    label: "Get Account",
    description:
      "Retrieve the properties and relationships of an account object in Microsoft Business Central.",
  },
  perform: async (context, { companyId, connection, accountId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<Account>(`/companies(${companyId})/accounts(${accountId})`);

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    accountId,
  },
  examplePayload: getAccountExamplePayload,
});
