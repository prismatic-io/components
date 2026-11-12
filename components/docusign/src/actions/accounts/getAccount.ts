import { action, outputSchema } from "@prismatic-io/spectral";
import { getAccountOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getAccountInputs } from "../../inputs";
import { getAccountExamplePayload } from "../../examplePayloads";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieves the account information for the specified account.",
  },
  performSafety: "safe",
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.get(`/${accountId}`);
    return { data };
  },
  inputs: getAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAccountOutputSchema,
  }),
  examplePayload: getAccountExamplePayload,
});
