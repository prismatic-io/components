import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { commentsCreateExamplePayload } from "../../examplePayloads";
import { commentsCreateInputs } from "../../inputs";

export const commentsCreate = action({
  display: {
    label: "Add Comment",
    description: "Adds a comment to a discussion.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, discussionId, text },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(
      `/sheets/${sheetId}/discussions/${discussionId}/comments`,
      { text },
    );
    return { data };
  },
  inputs: commentsCreateInputs,
  examplePayload: commentsCreateExamplePayload,
});
