import { action } from "@prismatic-io/spectral";
import { createDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { createDatabaseExampleResponse } from "../../examplePayloads";

export const updatedCreateDatabase = action({
  display: {
    label: "Create Database",
    description:
      "Creates a database as a subpage in the specified parent page, with the specified properties schema set on its initial data source.",
  },
  inputs: createDatabaseInputs,
  perform: async (
    context,
    {
      connection,
      parent,
      title,
      initialDataSourceProperties,
      icon,
      cover,
      description,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const payload = {
      parent,
      title,
      icon,
      cover,
      initial_data_source: initialDataSourceProperties
        ? { properties: initialDataSourceProperties }
        : undefined,
      description,
    };

    const { data } = await client.post("/databases", payload);
    return { data };
  },
  examplePayload: createDatabaseExampleResponse,
});
