import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../client";
import {
  connectionInput,
  facetNameInput,
  facetQueryInput,
  indexName,
  maxFacetHitsInput,
} from "../inputs";

export const searchFacetValues = action({
  display: {
    label: "Search Facet Values",
    description: "Search for values of a given facet.",
  },
  perform: async (
    context,
    { algoliaConnection, indexName, facetName, facetQuery, maxFacetHits },
  ) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    try {
      const response = await client.post(
        `/1/indexes/${indexName}/facets/${facetName}/query`,
        {
          facetQuery: facetQuery,
          maxFacetHits: maxFacetHits ? Number(maxFacetHits) : undefined, 
        },
      );
      return { data: response.data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    indexName: indexName,
    facetName: facetNameInput,
    facetQuery: facetQueryInput,
    maxFacetHits: maxFacetHitsInput,
  },
});
