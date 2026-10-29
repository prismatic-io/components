import {
  getSelf,
  type ISearchOptions,
  SearchQueryBuilder,
} from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { LIST_FEATURE_SERVICES_EXAMPLE_PAYLOAD } from "../examplePayloads";
import { connection, fetchAll, number, ownerName, start } from "../inputs";
import { getApiKeyManager, paginateRecords } from "../utils";

export const listFeatureServices = action({
  display: {
    label: "List Feature Services",
    description:
      "List all feature services in the portal by owner. Defaults to the current user.",
  },
  perform: async (
    _context,
    { connection, ownerName, fetchAll, number, start },
  ) => {
    const authentication = getApiKeyManager(connection);
    const self = await getSelf({ authentication });
    const username = self.user.username;
    const owner = ownerName || username;
    const featureServicesQuery = new SearchQueryBuilder()
      .match(owner)
      .in("owner")
      .and()
      .match("Feature Service")
      .in("type")
      .from(0)
      .to(1000);

    const searchItemParams: ISearchOptions = {
      authentication,
      q: featureServicesQuery,
    };

    if (!fetchAll) {
      searchItemParams.num = number;
      searchItemParams.start = start;
    }

    const data = await paginateRecords(searchItemParams, fetchAll);

    return {
      data: data as unknown,
    };
  },
  inputs: {
    connection,
    ownerName,
    fetchAll,
    start,
    number,
  },
  examplePayload: { data: LIST_FEATURE_SERVICES_EXAMPLE_PAYLOAD },
});
