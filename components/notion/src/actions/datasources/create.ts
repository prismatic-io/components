import { action } from "@prismatic-io/spectral";
import { createDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { createDataSourceResponse } from "../../examplePayloads";

export const createDataSource = action({
  display: {
    label: "Create Data Source",
    description:
      "Add an additional data source to an existing database. A standard table view is created alongside the new data source.",
  },
  inputs: createDataSourceInputs,
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
  examplePayload: createDataSourceResponse,
});
