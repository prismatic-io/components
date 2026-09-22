import { action, outputSchema } from "@prismatic-io/spectral";
import { createDatabaseItemOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createDatabaseItemExamplePayload } from "../../examplePayloads";
import { createDatabaseItemInputs } from "../../inputs";
export const createDatabaseItem = action({
  display: {
    label: "Create Database Item",
    description: "Creates an Item on a database.",
  },
  inputs: createDatabaseItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDatabaseItemOutputSchema,
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
      ...createDatabaseItemExamplePayload.data,
      ...(parent ? { parent } : {}),
      ...(icon ? { icon } : {}),
      ...(coverImage ? { cover: coverImage } : {}),
    },
  }),
  examplePayload: createDatabaseItemExamplePayload,
});
