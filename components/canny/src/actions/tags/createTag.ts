import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTagExamplePayload } from "../../examplePayloads";
import { createTagInputs } from "../../inputs";
import { createTagOutputSchema } from "../../outputSchemas";
export const createTag = action({
  display: {
    label: "Create Tag",
    description: "Creates a new tag in a board.",
  },
  inputs: createTagInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTagOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, boardIdRequired, tagName }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/tags/create", {
      boardID: boardIdRequired,
      name: tagName,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { tagName },
  ): Promise<{
    data: unknown;
  }> => {
    const slug = tagName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const [boardUrl] = createTagExamplePayload.data.url.split("?");
    return {
      data: {
        ...createTagExamplePayload.data,
        name: tagName,
        url: `${boardUrl}?tag=${slug}`,
      },
    };
  },
  examplePayload: createTagExamplePayload,
});
