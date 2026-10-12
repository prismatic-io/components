import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductUsersInputs } from "../../inputs";
import { getProductUsersExamplePayload } from "../../examplePayloads";
import { getProductUsersOutputSchema } from "../../outputSchemas";
export const getProductUsers = action({
  display: {
    label: "Get Product Users",
    description: "Lists permitted users for a product.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/products/${id}/permittedUsers`);
    return { data };
  },
  inputs: getProductUsersInputs,
  examplePayload: getProductUsersExamplePayload,
  examplePerform: async () => getProductUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductUsersOutputSchema,
  }),
});
