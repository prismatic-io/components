import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { archiveAccountInputs } from "../../inputs";
import { archiveAccountExamplePayload } from "../../examplePayloads";

export const archiveAccount = action({
  display: {
    label: "Archive Account",
    description: "Archive an account by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post("/accounts", {
      AccountID: util.types.toString(params.accountId),
      status: "ARCHIVED",
    });
    return { data };
  },
  inputs: archiveAccountInputs,
  examplePayload: archiveAccountExamplePayload,
});
