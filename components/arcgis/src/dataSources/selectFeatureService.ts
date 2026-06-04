import { getSelf, SearchQueryBuilder } from "@esri/arcgis-rest-portal";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { getApiKeyManager, paginateRecords } from "../utils";

export const selectFeatureService = dataSource({
  display: {
    label: "Select Feature Service",
    description: "Select a feature service from your ArcGIS portal by its ID.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const authentication = getApiKeyManager(connection);
    const self = await getSelf({ authentication });
    const username = self.user.username;
    const featureServicesQuery = new SearchQueryBuilder()
      .match(username)
      .in("owner")
      .and()
      .match("Feature Service")
      .in("type")
      .from(0)
      .to(1000);

    const data = await paginateRecords(
      { authentication, q: featureServicesQuery },
      true,
    );

    return {
      result: (data.results ?? [])
        .map<Element>((item) => ({
          label: item.title || item.name,
          key: item.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Feature Service",
        key: "89d7c5f2d82b4e5dbf88d248011a1234",
      },
    ],
  },
});
