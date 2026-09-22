import { action, outputSchema } from "@prismatic-io/spectral";
import { updateDataSourceOutputSchema } from "../../outputSchemas";
import { updateDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { updateDataSourceExamplePayload } from "../../examplePayloads";
export const updateDataSource = action({
  display: {
    label: "Update Data Source",
    description:
      "Update a data source object including its property schema, title, icon, and parent database.",
  },
  inputs: updateDataSourceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateDataSourceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, dataSourceId, title, properties, icon, databaseId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      title,
      properties,
      icon,
      parent: databaseId
        ? {
            database_id: databaseId,
            type: "database_id",
          }
        : undefined,
    };
    const { data } = await client.patch(
      `/data_sources/${dataSourceId}`,
      payload,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { dataSourceId, title, properties, icon, databaseId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateDataSourceExamplePayload.data,
      id: dataSourceId,
      ...(title ? { title } : {}),
      ...(properties ? { properties } : {}),
      ...(icon ? { icon } : {}),
      ...(databaseId
        ? { parent: { type: "database_id", database_id: databaseId } }
        : {}),
    },
  }),
  examplePayload: updateDataSourceExamplePayload,
});
