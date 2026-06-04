import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrievePostExamplePayload } from "../../examplePayloads";
import { retrievePostInputs } from "../../inputs";

export const retrievePost = action({
  display: {
    label: "Retrieve Post",
    description: "Retrieves a single post by ID.",
  },
  inputs: retrievePostInputs,
  perform: async (context, { connection, postId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/retrieve", { id: postId });
    return { data };
  },
  examplePayload: retrievePostExamplePayload,
});
