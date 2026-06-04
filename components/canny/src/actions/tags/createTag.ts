import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTagExamplePayload } from "../../examplePayloads";
import { createTagInputs } from "../../inputs";

export const createTag = action({
  display: {
    label: "Create Tag",
    description: "Creates a new tag in a board.",
  },
  inputs: createTagInputs,
  perform: async (context, { connection, boardIdRequired, tagName }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/tags/create", {
      boardID: boardIdRequired,
      name: tagName,
    });
    return { data };
  },
  examplePayload: createTagExamplePayload,
});
