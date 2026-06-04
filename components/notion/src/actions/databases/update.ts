import { action, util } from "@prismatic-io/spectral";
import { updateDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { updateDatabaseResponse } from "../../examplePayloads";

export const updatedUpdateDatabase = action({
  display: {
    label: "Update Database",
    description:
      "Update database-level attributes such as title, icon, cover, and inline status. To update data source properties, use the Update Data Source action.",
  },
  inputs: updateDatabaseInputs,
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
  examplePayload: updateDatabaseResponse,
});
