import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../client";
import { code, connectionInput } from "../inputs";

export const getNewClientSecret = action({
  display: {
    label: "Get New Client Secret",
    description: "Obtain new client secret for Paylocity-issued client id.",
  },
  inputs: {
    connectionInput,
    code,
  },
  perform: async (context, { connectionInput, code }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.post(`/credentials/secrets`, {
      code: code || undefined,
    });
    return {
      data,
    };
  },
});
