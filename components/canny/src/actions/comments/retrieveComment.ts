import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveCommentExamplePayload } from "../../examplePayloads";
import { retrieveCommentInputs } from "../../inputs";

export const retrieveComment = action({
  display: {
    label: "Retrieve Comment",
    description: "Retrieves a single comment by ID.",
  },
  inputs: retrieveCommentInputs,
  perform: async (context, { connection, commentId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/comments/retrieve", { id: commentId });
    return { data };
  },
  examplePayload: retrieveCommentExamplePayload,
});
