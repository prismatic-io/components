import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { commentGetExamplePayload } from "../../examplePayloads";
import { commentGetInputs } from "../../inputs";

export const commentGet = action({
  display: {
    label: "Get Comment",
    description: "Retrieves a comment by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, commentId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/comments/${commentId}`,
    );
    return { data };
  },
  inputs: commentGetInputs,
  examplePayload: commentGetExamplePayload,
});
