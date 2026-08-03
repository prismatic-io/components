import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAdAccountResponse } from "../../examplePayloads";
import { getAdAccountInputs } from "../../inputs";
export const getAdAccount = action({
  display: {
    label: "Get Ad Account",
    description: "Get the information and metadata of the given ad account.",
  },
  perform: async (context, { version, connection, adAccountId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adAccountId}`, {
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: getAdAccountInputs,
  examplePayload: getAdAccountResponse,
});
