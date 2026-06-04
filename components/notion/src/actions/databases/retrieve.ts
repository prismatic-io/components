import { action } from "@prismatic-io/spectral";
import { retrieveDatabaseInputs } from "../../inputs";
import { createClient } from "../../client";
import { retrieveDatabaseResponse } from "../../examplePayloads";

export const retrieveDatabase = action({
  display: {
    label: "Retrieve Database",
    description:
      "Retrieve a database object by ID. Returns database-level information including child data sources.",
  },
  inputs: retrieveDatabaseInputs,
  perform: async (context, { connection, databaseId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/databases/${databaseId}`);
    return { data };
  },
  examplePayload: retrieveDatabaseResponse,
});
