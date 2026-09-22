import { action, outputSchema, util } from "@prismatic-io/spectral";
import { updatedUpdateDatabaseOutputSchema } from "../../outputSchemas";
import { updatedUpdateDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { updatedUpdateDatabaseExamplePayload } from "../../examplePayloads";
export const updatedUpdateDatabase = action({
  display: {
    label: "Update Database",
    description:
      "Update database-level attributes such as title, icon, cover, and inline status. To update data source properties, use the Update Data Source action.",
  },
  inputs: updatedUpdateDatabaseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatedUpdateDatabaseOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, databaseId, title, icon, cover, isInline, parent },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      title,
      icon,
      cover,
      is_inline: isInline ? util.types.toBool(isInline) : undefined,
      parent,
    };
    const { data } = await client.patch(`/databases/${databaseId}`, payload);
    return { data };
  },
  examplePerform: async (
    _context,
    { databaseId, title, icon, cover, isInline, parent },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updatedUpdateDatabaseExamplePayload.data,
      id: databaseId,
      ...(title ? { title } : {}),
      ...(icon ? { icon } : {}),
      ...(cover ? { cover } : {}),
      ...(isInline ? { is_inline: util.types.toBool(isInline) } : {}),
      ...(parent ? { parent } : {}),
    },
  }),
  examplePayload: updatedUpdateDatabaseExamplePayload,
});
