import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrievePostExamplePayload } from "../../examplePayloads";
import { retrievePostInputs } from "../../inputs";
import { retrievePostOutputSchema } from "../../outputSchemas";
export const retrievePost = action({
  display: {
    label: "Retrieve Post",
    description: "Retrieves a single post by ID.",
  },
  inputs: retrievePostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrievePostOutputSchema,
  }),
  perform: async (context, { connection, postId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/retrieve", { id: postId });
    return { data };
  },
  examplePayload: retrievePostExamplePayload,
});
