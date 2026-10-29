import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addCommentExamplePayload } from "../../examplePayloads";
import { addCommentInputs } from "../../inputs";

export const addComment = action({
  display: {
    label: "Add Comment",
    description: "Adds a comment to a service request.",
  },
  inputs: addCommentInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, commentBody, publicComment },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/request/${issueIdOrKey}/comment`, {
      body: commentBody,
      public: publicComment,
    });
    return { data };
  },
  examplePayload: addCommentExamplePayload,
});
