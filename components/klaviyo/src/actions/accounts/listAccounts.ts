import { action, outputSchema } from "@prismatic-io/spectral";
import { listAccountsOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listAccountsInputs as inputs } from "../../inputs";
import { listAccountsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsAccount } from "../../types";
export const listAccounts = action({
  display: {
    label: "List Accounts",
    description:
      "Retrieve the account(s) associated with a given private API key.",
  },
  performSafety: "safe",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listAccountsExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAccountsOutputSchema,
  }),
  examplePayload: listAccountsExamplePayload,
});
