import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../client";
import {
  connectionInput,
  indexName,
  queryString,
  requestsInput,
  strategyInput,
} from "../inputs";

export const getIndex = action({
  display: {
    label: "Get Index",
    description: "Get index information",
  },
  perform: async (context, { algoliaConnection, indexName, queryString }) => {
    const client = createAlgoliaClient({
      algoliaConnection: algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    try {
      const response = await client.get(
        `/1/indexes/${indexName}?${queryString}`,
      );
      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    indexName: indexName,
    queryString: queryString,
  },
});

export const searchMultipleIndices = action({
  display: {
    label: "Search Multiple Indices",
    description:
      "Send multiple search queries, potentially targeting multiple indices, in a single API call.",
  },
  perform: async (context, { algoliaConnection, requests, strategy }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });
    const queries = requests.map(
      (request: { indexName: string; params: unknown }) => {
        const { indexName, params } = request;

        return {
          indexName,
          params,
        };
      },
    );

    try {
      const { data } = await client.post(`/1/indexes/*/queries`, {
        requests: queries,
        strategy: strategy,
      });
      return {
        data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    requests: requestsInput,
    strategy: strategyInput,
  },
});
