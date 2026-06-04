import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPostExamplePayload } from "../../examplePayloads";
import { createPostInputs } from "../../inputs";

export const createPost = action({
  display: {
    label: "Create Post",
    description: "Creates a new feedback post.",
  },
  inputs: createPostInputs,
  perform: async (
    context,
    {
      connection,
      boardIdRequired,
      authorIdRequired,
      title,
      details,
      categoryId,
      customFields,
      eta,
      etaPublic,
      imageURLs,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/create", {
      authorID: authorIdRequired,
      boardID: boardIdRequired,
      title,
      details,
      categoryID: categoryId,
      customFields,
      eta,
      etaPublic,
      imageURLs,
      ...additionalFields,
    });
    return { data };
  },
  examplePayload: createPostExamplePayload,
});
