import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { changePostStatusExamplePayload } from "../../examplePayloads";
import { changePostStatusInputs } from "../../inputs";
import { changePostStatusOutputSchema } from "../../outputSchemas";
export const changePostStatus = action({
  display: {
    label: "Change Post Status",
    description: "Changes the status of a post.",
  },
  inputs: changePostStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changePostStatusOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      postId,
      statusRequired,
      changerId,
      shouldNotifyVoters,
      postCommentValue,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/change_status", {
      postID: postId,
      status: statusRequired,
      changerID: changerId,
      shouldNotifyVoters,
      commentValue: postCommentValue,
      ...additionalFields,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { postId, statusRequired, postCommentValue },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...changePostStatusExamplePayload.data,
      id: postId,
      status: statusRequired,
      changeComment: postCommentValue
        ? {
            ...changePostStatusExamplePayload.data.changeComment,
            value: postCommentValue,
          }
        : changePostStatusExamplePayload.data.changeComment,
    },
  }),
  examplePayload: changePostStatusExamplePayload,
});
