import { dataSource, type Element } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../client";
import { selectCollectionInputs } from "../inputs";
import { CosmosDbResourceType, HttpVerb } from "../constants";

export const selectCollection = dataSource({
  display: {
    label: "Select Collection",
    description:
      "Select a collection from the list of collections in a database",
  },
  inputs: selectCollectionInputs,
  perform: async (_context, { connection, databaseId }) => {
    const resourceLink = `dbs/${databaseId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Collections,
      resourceLink,
      debug: false,
    });
    const response = await client.get(`/${resourceLink}/colls`);
    const collections: { id: string }[] =
      response.data.DocumentCollections || [];

    const result = collections.map<Element>((collection) => ({
      label: collection.id,
      key: collection.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});
