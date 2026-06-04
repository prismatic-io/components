import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getAccountInputs as inputs } from "../../inputs/accounts";
import type { FieldsAccount } from "../../types/FieldsAccount";
import { getAccountExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieve a single account object by its account ID.",
  },
  perform: async (context, { connection, fieldsAccount, accountId }) => {
    const accountsApi = getApi(connection, KlaviyoApi.Accounts);
    const debug = context.debug.enabled;

    if (debug) {
      context.logger.debug({ connection, fieldsAccount, accountId, debug });
    }

    const { body } = await accountsApi.getAccount(accountId!, {
      fieldsAccount: fieldsAccount as FieldsAccount[],
    });

    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getAccountExamplePayload,
});
