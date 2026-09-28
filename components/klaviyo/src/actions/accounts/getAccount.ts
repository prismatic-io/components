import { action, outputSchema } from "@prismatic-io/spectral";
import { getAccountOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getAccountInputs as inputs } from "../../inputs";
import { getAccountExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsAccount } from "../../types";
export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieve a single account object by its account ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fieldsAccount, accountId }) => {
    const accountsApi = getApi(connection, KlaviyoApi.Accounts);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsAccount, accountId, debug });
    }
    const { body } = await accountsApi.getAccount(accountId, {
      fieldsAccount: fieldsAccount as FieldsAccount[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getAccountExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAccountOutputSchema,
  }),
  examplePayload: getAccountExamplePayload,
});
