import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, accountId } from "../inputs";
import { listAccountSettingsPayload } from "../examplePayloads";

export const listAccountSettings = action({
  display: {
    label: "List Account Settings",
    description:
      "Retrieves the account settings information for the specified account.",
  },
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.get(`/${accountId}/settings`);
    return { data };
  },
  inputs: {
    connection,
    accountId,
  },
  examplePayload: listAccountSettingsPayload,
});
