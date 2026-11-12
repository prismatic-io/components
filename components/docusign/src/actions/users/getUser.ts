import { action, outputSchema } from "@prismatic-io/spectral";
import { getUserOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getUserInputs } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieves the user information for the specified user.",
  },
  performSafety: "safe",
  perform: async (context, { connection, userId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${userId}`);
    return { data };
  },
  inputs: getUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  examplePayload: getUserExamplePayload,
});
