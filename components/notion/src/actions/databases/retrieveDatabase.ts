import { action, outputSchema } from "@prismatic-io/spectral";
import { retrieveDatabaseOutputSchema } from "../../outputSchemas";
import { retrieveDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { retrieveDatabaseExamplePayload } from "../../examplePayloads";
export const retrieveDatabase = action({
  display: {
    label: "Retrieve Database",
    description:
      "Retrieve a database object by ID. Returns database-level information including child data sources.",
  },
  inputs: retrieveDatabaseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveDatabaseOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, databaseId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/databases/${databaseId}`);
    return { data };
  },
  examplePayload: retrieveDatabaseExamplePayload,
});
