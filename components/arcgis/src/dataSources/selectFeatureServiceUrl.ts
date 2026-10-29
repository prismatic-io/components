import { getSelf, SearchQueryBuilder } from "@esri/arcgis-rest-portal";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { getApiKeyManager, paginateRecords } from "../utils";

export const selectFeatureServiceUrl = dataSource({
  display: {
    label: "Select Feature Service URL",
    description: "Select a feature service URL from your ArcGIS portal.",
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
        .filter((item) => item.url)
        .map<Element>((item) => ({
          label: item.title || item.name,
          key: item.url as string,
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Feature Service",
        key: "https://services2.arcgis.com/ABCD12345abcd1234/arcgis/rest/services/Example/FeatureServer",
      },
    ],
  },
});
