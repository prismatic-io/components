import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listLibraryCollectionsExamplePayload as examplePayload } from "../../examplePayloads";
import { listLibraryCollectionsInputs as inputs } from "../../inputs/libraries";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListLibraryCollectionsResponse from "../types/listLibraryCollectionts";

export const listLibraryCollections = action({
  display: {
    label: "List Library Collections",
    description: "Retrieve a list of Collections belonging to a Library.",
  },
  perform: async (
    context,
    { connection, libraryId, page, limit, fetchAll, assetPage, assetLimit },
  ): Promise<{ data: ListLibraryCollectionsResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });
    const query = gql`
      query listLibraryCollections(
        $libraryId: ID!
        $page: Int
        $limit: Int
        $assetPage: Int
        $assetLimit: Int
      ) {
        library(id: $libraryId) {
          id
          name
          collections(page: $page, limit: $limit) {
            total
            page
            limit
            hasNextPage
            items {
              id
              name
              assets(page: $assetPage, limit: $assetLimit) {
                total
                page
                limit
                hasNextPage
                items {
                  id
                }
              }
            }
          }
        }
      }
    `;
    if (fetchAll) {
      const hasNextPath = ["library", "collections", "hasNextPage"];
      const responses: ListLibraryCollectionsResponse[] = await graphqlFetchAll(
        {
          client,
          query,
          params: {
            libraryId,
            assetPage,
            assetLimit,
          },
          hasNextPath,
        },
      );

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedCollections = responses.reduce((combined, response) => {
        return combined.concat(response.library.collections.items);
      }, []);

      const formattedResponse: { data: ListLibraryCollectionsResponse } = {
        data: {
          library: {
            ...baseResponse.library,
            collections: {
              ...baseResponse.library.collections,
              items: combinedCollections,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListLibraryCollectionsResponse = await client.request(
      query,
      { libraryId, page, limit },
    );

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
