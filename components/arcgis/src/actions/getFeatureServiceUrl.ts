import {
  getSelf,
  SearchQueryBuilder,
  searchItems,
} from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { GET_FEATURE_SERVICE_URL_EXAMPLE_PAYLOAD } from "../examplePayloads";
import { connection, featureServiceName, ownerName } from "../inputs";
import { getApiKeyManager } from "../utils";

export const getFeatureServiceUrl = action({
  display: {
    label: "Get Feature Service URL",
    description:
      "Get the URL of a feature service in the portal by owner. Defaults to the current user.",
  },
  perform: async (_context, { connection, featureServiceName, ownerName }) => {
    const authentication = getApiKeyManager(connection);
    const self = await getSelf({ authentication });
    const username = self.user.username;
    const owner = ownerName || username;
    const featureServicesQuery = new SearchQueryBuilder()
      .match(owner)
      .in("owner")
      .and()
      .match("Feature Service")
      .in("type");

    const searchItemsResults = await searchItems({
      authentication,
      q: featureServicesQuery,
    });

    const foundItem = searchItemsResults.results.find(
      (item) => item.name.toLowerCase() === featureServiceName.toLowerCase(),
    );

    return { data: foundItem?.url };
  },
  inputs: {
    connection,
    featureServiceName,
    ownerName,
  },
  examplePayload: { data: GET_FEATURE_SERVICE_URL_EXAMPLE_PAYLOAD },
});
