import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { listCollectionsInputs } from "../../inputs";
import { listCollectionsExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const listCollections = action({
  display: {
    label: "List Collections",
    description: "List all collections in a database",
  },
  perform: async (context, { connection, databaseId }) => {
    const resourceLink = `dbs/${databaseId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Collections,
      resourceLink,
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/${resourceLink}/colls`);
    return {
      data,
    };
  },
  inputs: listCollectionsInputs,
  examplePayload: listCollectionsExamplePayload,
});
