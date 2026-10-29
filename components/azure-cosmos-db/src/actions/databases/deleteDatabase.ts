import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { deleteDatabaseInputs } from "../../inputs";
import { deleteDatabaseExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const deleteDatabase = action({
  display: {
    label: "Delete Database",
    description: "Delete a database from Cosmos DB",
  },
  perform: async (context, { connection, databaseId }) => {
    const resourceLink = `dbs/${databaseId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.DELETE,
      resourceType: CosmosDbResourceType.Databases,
      resourceLink,
      debug: context.debug.enabled,
    });
    await client.delete(`/${resourceLink}`);
    return {
      data: {
        success: true,
        message: `Database ${databaseId} deleted successfully`,
      },
    };
  },
  inputs: deleteDatabaseInputs,
  examplePayload: deleteDatabaseExamplePayload,
});
