import { action, outputSchema } from "@prismatic-io/spectral";
import { listAccountSettingsOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { listAccountSettingsInputs } from "../../inputs";
import { listAccountSettingsExamplePayload } from "../../examplePayloads";

export const listAccountSettings = action({
  display: {
    label: "List Account Settings",
    description:
      "Retrieves the account settings information for the specified account.",
  },
  performSafety: "safe",
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.get(`/${accountId}/settings`);
    return { data };
  },
  inputs: listAccountSettingsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAccountSettingsOutputSchema,
  }),
  examplePayload: listAccountSettingsExamplePayload,
});
