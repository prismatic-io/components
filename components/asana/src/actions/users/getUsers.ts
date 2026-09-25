import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getUsersExamplePayload } from "../../examplePayloads";
import { getUsersInputs } from "../../inputs";
import { userResponseSchema } from "../../outputSchemas";
export const getUsers = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of a user.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${params.userId}`);
    return { data };
  },
  inputs: getUsersInputs,
  examplePayload: getUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userResponseSchema,
  }),
});
