import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { listDatabasesInputs } from "../../inputs";
import { listDatabasesExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const listDatabases = action({
  display: {
    label: "List Databases",
    description: "List all databases in the Cosmos DB account",
  },
  perform: async (context, { connection }) => {
    const resourceLink = `dbs`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Databases,
      resourceLink: "",
      debug: context.debug.enabled,
    });
    const response = await client.get(`/${resourceLink}`);
    return {
      data: response.data,
    };
  },
  inputs: listDatabasesInputs,
  examplePayload: listDatabasesExamplePayload,
});
