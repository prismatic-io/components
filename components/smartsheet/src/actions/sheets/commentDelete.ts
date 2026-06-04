import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { commentDeleteExamplePayload } from "../../examplePayloads";
import { commentDeleteInputs } from "../../inputs";

export const commentDelete = action({
  display: {
    label: "Delete Comment",
    description: "Deletes a comment by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, commentId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(
      `/sheets/${sheetId}/comments/${commentId}`,
    );
    return { data };
  },
  inputs: commentDeleteInputs,
  examplePayload: commentDeleteExamplePayload,
});
