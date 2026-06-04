import { action } from "@prismatic-io/spectral";
import { getAccountInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { AccountInfoResponse } from "../../types";
import { getAccountExamplePayload } from "../../examplePayloads";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieves the information for an account.",
  },
  inputs: getAccountInputs,
  perform: async (context, { connection, accountId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { data } = await client.get<AccountInfoResponse>(
      `/accounts/${accountId}`,
    );

    return { data };
  },
  examplePayload: getAccountExamplePayload,
});
