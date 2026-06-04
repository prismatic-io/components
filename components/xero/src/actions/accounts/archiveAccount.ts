import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { accountId, connectionInput } from "../../inputs";
import { archiveAccountExamplePayload } from "../../examplePayloads";

export const archiveAccount = action({
  display: {
    label: "Archive Account",
    description: "Archive the information and metadata of an account by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/accounts`, {
      AccountID: util.types.toString(params.accountId),
      status: "ARCHIVED",
    });
    return { data };
  },
  inputs: { accountId, xeroConnection: connectionInput },
  examplePayload: archiveAccountExamplePayload,
});
