import { action, outputSchema } from "@prismatic-io/spectral";
import { updatedCreateDatabaseOutputSchema } from "../../outputSchemas";
import { updatedCreateDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { updatedCreateDatabaseExamplePayload } from "../../examplePayloads";
export const updatedCreateDatabase = action({
  display: {
    label: "Create Database",
    description:
      "Creates a database as a subpage in the specified parent page, with the specified properties schema set on its initial data source.",
  },
  inputs: updatedCreateDatabaseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatedCreateDatabaseOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { parent, title, icon, cover, description },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updatedCreateDatabaseExamplePayload.data,
      ...(parent ? { parent } : {}),
      ...(title ? { title } : {}),
      ...(icon ? { icon } : {}),
      ...(cover ? { cover } : {}),
      ...(description ? { description } : {}),
    },
  }),
  examplePayload: updatedCreateDatabaseExamplePayload,
});
