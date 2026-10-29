import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonUsersInputs } from "../../inputs";
import { getPersonUsersExamplePayload } from "../../examplePayloads";
import { getPersonUsersOutputSchema } from "../../outputSchemas";

export const getPersonUsers = action({
  display: {
    label: "Get Person Users",
    description: "Lists permitted users for a person.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/permittedUsers`);
    return { data };
  },
  inputs: getPersonUsersInputs,
  examplePayload: getPersonUsersExamplePayload,
  examplePerform: async () => getPersonUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonUsersOutputSchema,
  }),
});
