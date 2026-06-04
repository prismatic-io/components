import { action } from "@prismatic-io/spectral";
import { updateDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { updateDataSourceResponse } from "../../examplePayloads";

export const updateDataSource = action({
  display: {
    label: "Update Data Source",
    description:
      "Update a data source object including its properties (schema), title, description, and trash status.",
  },
  inputs: updateDataSourceInputs,
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
  examplePayload: updateDataSourceResponse,
});
