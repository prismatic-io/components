import { dataSource, type Element } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../client";
import { selectDatabaseInputs } from "../inputs";
import { CosmosDbResourceType, HttpVerb } from "../constants";

export const selectDatabase = dataSource({
  display: {
    label: "Select Database",
    description: "Select a database from the list of databases",
  },
  inputs: selectDatabaseInputs,
  perform: async (_context, { connection }) => {
    const resourceLink = `dbs`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Databases,
      resourceLink: "",
      debug: false,
    });
    const response = await client.get(`/${resourceLink}`);
    const databases: { id: string }[] = response.data.Databases || [];

    const result = databases.map<Element>((database) => ({
      label: database.id,
      key: database.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});
