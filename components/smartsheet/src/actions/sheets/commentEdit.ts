import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { commentEditExamplePayload } from "../../examplePayloads";
import { commentEditInputs } from "../../inputs";

export const commentEdit = action({
  display: {
    label: "Edit Comment",
    description: "Edits a comment by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, commentId, text },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.put(
      `/sheets/${sheetId}/comments/${commentId}`,
      { text },
    );
    return { data };
  },
  inputs: commentEditInputs,
  examplePayload: commentEditExamplePayload,
});
