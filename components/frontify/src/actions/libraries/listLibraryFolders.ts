import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listLibraryFoldersExamplePayload as examplePayload } from "../../examplePayloads";
import { listLibraryFoldersInputs as inputs } from "../../inputs/libraries";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListLibraryFoldersResponse from "../types/listLibraryFolders";

export const listLibraryFolders = action({
  display: {
    label: "List Library Folders",
    description:
      "Retrieve a list of the top-level folders in a Library. To browse further, use the Raw Request action.",
  },
  perform: async (
    context,
    { connection, libraryId, page, limit, fetchAll },
  ): Promise<{ data: ListLibraryFoldersResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });

    const query = gql`
      query listLibraryFolders($libraryId: ID!) {
        library(id: $libraryId) {
          id
          name
          browse {
            folders {
              limit
              page
              hasNextPage
              total
              items {
                id
                name
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
                breadcrumbs {
                  id
                  name
                }
                folders {
                  total
                }
              }
            }
          }
        }
      }
    `;

    if (fetchAll) {
      const hasNextPath = ["library", "browse", "folders", "hasNextPage"];
      const responses: ListLibraryFoldersResponse[] = await graphqlFetchAll({
        client,
        query,
        params: { libraryId },
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedFolders = responses.reduce((combined, response) => {
        return combined.concat(response.library.browse.folders.items);
      }, []);

      const formattedResponse: { data: ListLibraryFoldersResponse } = {
        data: {
          library: {
            ...baseResponse.library,
            browse: {
              ...baseResponse.library.browse,
              folders: {
                ...baseResponse.library.browse.folders,
                items: combinedFolders,
              },
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListLibraryFoldersResponse = await client.request(query, {
      libraryId,
      page,
      limit,
    });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
