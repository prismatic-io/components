import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { changePostStatusExamplePayload } from "../../examplePayloads";
import { changePostStatusInputs } from "../../inputs";

export const changePostStatus = action({
  display: {
    label: "Change Post Status",
    description: "Changes the status of a post.",
  },
  inputs: changePostStatusInputs,
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
  examplePayload: changePostStatusExamplePayload,
});
