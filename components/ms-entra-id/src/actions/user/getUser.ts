import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserExamplePayload as examplePayload } from "../../examplePayloads";
import { getUserInputs as inputs } from "../../inputs/user";
import { getUserOutputSchema } from "../../outputSchemas";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Reads the properties and relationships of a user object.",
  },
  performSafety: "safe",
  perform: async (context, { connection, userId, $select }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { $select };
    const { data } = await client.get(`/users/${userId}`, { params });
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  examplePayload,
});
