import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealUsersInputs } from "../../inputs";
import { getDealUsersExamplePayload } from "../../examplePayloads";
import { getDealUsersOutputSchema } from "../../outputSchemas";
export const getDealUsers = action({
  display: {
    label: "Get Deal Users",
    description: "Lists permitted users for a deal.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/permittedUsers`);
    return { data };
  },
  inputs: getDealUsersInputs,
  examplePayload: getDealUsersExamplePayload,
  examplePerform: async () => getDealUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealUsersOutputSchema,
  }),
});
