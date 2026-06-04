import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listAccountsInputs as inputs } from "../../inputs/accounts";
import type { FieldsAccount } from "../../types/FieldsAccount";
import { listAccountsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description:
      "Retrieve the account(s) associated with a given private API key.",
  },
  perform: async (context, { connection, fieldsAccount }) => {
    const accountsApi = getApi(connection, KlaviyoApi.Accounts);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsAccount, debug });
    }
    const { body } = await accountsApi.getAccounts({
      fieldsAccount: fieldsAccount as FieldsAccount[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: listAccountsExamplePayload,
});
