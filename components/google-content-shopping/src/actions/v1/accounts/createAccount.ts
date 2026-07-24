import { action, util } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { createAccountExamplePayload } from "../../../examplePayloads/v1";
import { createAccountInputs } from "../../../inputs/v1/accounts";
export const createAccountMerchant = action({
  display: {
    description:
      "Creates and configures a new Merchant Center account, requiring at least one service relationship (e.g. account aggregation under your advanced account).",
    label: "Create Account (Merchant v1)",
  },
  inputs: createAccountInputs,
  perform: async (
    context,
    {
      connectionInput,
      accountName,
      adultContent,
      timeZone,
      languageCode,
      users,
      service,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      "/accounts/v1/accounts:createAndConfigure",
      {
        account: {
          accountName,
          adultContent,
          ...(timeZone ? { timeZone: { id: timeZone } } : {}),
          languageCode,
        },
        user: users,
        service: (service ?? []).map((row) => ({
          [util.types.toString(row.serviceType)]: {},
          provider: row.provider,
          ...(row.externalAccountId
            ? { externalAccountId: row.externalAccountId }
            : {}),
        })),
      },
    );
    return { data };
  },
  examplePayload: createAccountExamplePayload,
});
