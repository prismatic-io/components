import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { createDatabaseInputs } from "../../inputs";
import { createDatabaseExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const createDatabase = action({
  display: {
    label: "Create Database",
    description: "Create a new database in Cosmos DB",
  },
  perform: async (context, { connection, databaseId }) => {
    const resourceLink = `dbs`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.POST,
      resourceType: CosmosDbResourceType.Databases,
      resourceLink: "",
      debug: context.debug.enabled,
    });

    const body = {
      id: databaseId,
    };

    const { data } = await client.post(`/${resourceLink}`, body);
    return {
      data,
    };
  },
  inputs: createDatabaseInputs,
  examplePayload: createDatabaseExamplePayload,
});
