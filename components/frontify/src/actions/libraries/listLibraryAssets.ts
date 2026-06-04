import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listLibraryAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listLibraryAssetsInputs as inputs } from "../../inputs/libraries";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListLibraryAssetsResponse from "../types/listLibraryAssets";
export const listLibraryAssetsQuery = gql`
  query listLibraryAssets(
    $libraryId: ID!
    $page: Int
    $limit: Int
    $query: AssetQueryInput
  ) {
    library(id: $libraryId) {
      id
      name
      assets(page: $page, limit: $limit, query: $query) {
        limit
        page
        total
        hasNextPage
        items {
          id
          creator {
            id
            name
            email
          }
          createdAt
          modifier {
            id
            name
            email
          }
          modifiedAt
          title
          description
          attachments {
            id
            creator {
              id
              name
              email
            }
            createdAt
            modifier {
              id
              name
              email
            }
            modifiedAt
            name
            filename
            type
            externalId
            extension
            size
            downloadUrl
          }
          externalId
          tags {
            value
            source
          }
          copyright {
            status
            notice
          }
          expiresAt
          licenses {
            id
            title
            license
            addByDefault
            requireConsensus
          }
          status
          relatedAssets {
            total
          }
          comments {
            total
          }
          customMetadata {
            ... on CustomMetadataValue {
              value
            }
            ... on CustomMetadataValues {
              values
            }
            property {
              id
              creator {
                id
                name
                email
              }
              createdAt
              modifier {
                id
                name
                email
              }
              modifiedAt
              name
              type {
                name
              }
              helpText
              isRequired
              defaultValue
            }
          }
          location {
            brand {
              id
              name
            }
            library {
              id
              name
            }
            workspaceProject {
              id
              name
            }
            folder {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const listLibraryAssets = action({
  display: {
    label: "List Library Assets",
    description: "Retrieve a list of Assets belonging to a Library.",
  },
  perform: async (
    context,
    {
      connection,
      libraryId,
      page,
      limit,
      fetchAll,
      assetExternalId,
      assetSearch,
    },
  ): Promise<{ data: ListLibraryAssetsResponse }> => {
    const query = { externalId: assetExternalId, search: assetSearch };

    const client = createClient({ connection, debug: context.debug.enabled });

    if (fetchAll) {
      const hasNextPath = ["library", "assets", "hasNextPage"];
      const responses: ListLibraryAssetsResponse[] = await graphqlFetchAll({
        client,
        query: listLibraryAssetsQuery,
        params: { libraryId, query },
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedAssets = responses.reduce((combined, response) => {
        return combined.concat(response.library.assets.items);
      }, []);

      const formattedResponse: { data: ListLibraryAssetsResponse } = {
        data: {
          library: {
            ...baseResponse.library,
            assets: {
              ...baseResponse.library.assets,
              items: combinedAssets,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListLibraryAssetsResponse = await client.request(
      listLibraryAssetsQuery,
      { libraryId, page, limit, query },
    );

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
