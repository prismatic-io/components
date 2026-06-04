import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { accountId, connectionInput } from "../../inputs";
import { getAccountExamplePayload } from "../../examplePayloads";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Get the information and metadata of an account by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/accounts/${params.accountId}`);
    return { data };
  },
  inputs: { accountId, xeroConnection: connectionInput },
  examplePayload: getAccountExamplePayload,
});
