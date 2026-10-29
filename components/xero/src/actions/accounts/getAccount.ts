import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getAccountInputs } from "../../inputs";
import { getAccountExamplePayload } from "../../examplePayloads";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieve the information and metadata of an account by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/accounts/${params.accountId}`);
    return { data };
  },
  inputs: getAccountInputs,
  examplePayload: getAccountExamplePayload,
});
