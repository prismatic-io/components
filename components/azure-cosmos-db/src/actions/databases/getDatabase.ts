import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { getDatabaseInputs } from "../../inputs";
import { getDatabaseExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const getDatabase = action({
  display: {
    label: "Get Database",
    description: "Get a specific database by ID",
  },
  perform: async (context, { connection, databaseId }) => {
    const resourceLink = `dbs/${databaseId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Databases,
      resourceLink,
      debug: context.debug.enabled,
    });
    const response = await client.get(`/${resourceLink}`);
    return {
      data: response.data,
    };
  },
  inputs: getDatabaseInputs,
  examplePayload: getDatabaseExamplePayload,
});
