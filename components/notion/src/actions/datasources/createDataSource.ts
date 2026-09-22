import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataSourceOutputSchema } from "../../outputSchemas";
import { createDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { createDataSourceExamplePayload } from "../../examplePayloads";
export const createDataSource = action({
  display: {
    label: "Create Data Source",
    description:
      "Add an additional data source to an existing database. A standard table view is created alongside the new data source.",
  },
  inputs: createDataSourceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDataSourceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, databaseId, title, properties, icon },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      parent: {
        database_id: databaseId,
        type: "database_id",
      },
      properties,
      title,
      icon,
    };
    const { data } = await client.post("/data_sources", payload);
    return { data };
  },
  examplePerform: async (
    _context,
    { databaseId, title, properties, icon },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createDataSourceExamplePayload.data,
      parent: {
        type: "database_id",
        database_id: databaseId,
      },
      ...(title ? { title } : {}),
      ...(properties ? { properties } : {}),
      ...(icon ? { icon } : {}),
    },
  }),
  examplePayload: createDataSourceExamplePayload,
});
