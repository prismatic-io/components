import { action, outputSchema } from "@prismatic-io/spectral";
import { createPageOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createPageExamplePayload } from "../../examplePayloads";
import { createPageInputs } from "../../inputs";
export const createPage = action({
  display: {
    label: "Create Page",
    description:
      "Creates a new page that is a child of an existing page or database.",
  },
  inputs: createPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPageOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { children, connection, coverImage, icon, parent, properties },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/pages", {
      parent: parent || undefined,
      properties: properties || undefined,
      children: children || undefined,
      icon: icon || undefined,
      cover: coverImage || undefined,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { parent, icon, coverImage },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createPageExamplePayload.data,
      ...(parent ? { parent } : {}),
      ...(icon ? { icon } : {}),
      ...(coverImage ? { cover: coverImage } : {}),
    },
  }),
  examplePayload: createPageExamplePayload,
});
