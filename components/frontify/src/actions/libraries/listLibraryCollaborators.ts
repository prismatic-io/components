import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listLibraryCollaboratorsExamplePayload as examplePayload } from "../../examplePayloads";
import { listLibraryCollaboratorsInputs as inputs } from "../../inputs/libraries";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListLibraryCollaboratorsResponse from "../types/listLibraryCollaborators";

export const listLibraryCollaborators = action({
  display: {
    label: "List Library Collaborators",
    description: "Retrieve a list of Collaborators belonging to a Library.",
  },
  perform: async (
    context,
    { connection, libraryId, page, limit, fetchAll },
  ): Promise<{ data: ListLibraryCollaboratorsResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });
    const query = gql`
      query listLibraryCollaborators($libraryId: ID!, $page: Int, $limit: Int) {
        library(id: $libraryId) {
          id
          name
          collaborators {
            users(limit: $limit, page: $page) {
              total
              page
              limit
              hasNextPage
              items {
                id
                email
                name
              }
            }
          }
        }
      }
    `;
    if (fetchAll) {
      const hasNextPath = ["library", "collaborators", "users", "hasNextPage"];
      const responses: ListLibraryCollaboratorsResponse[] =
        await graphqlFetchAll({
          client,
          query,
          params: { libraryId },
          hasNextPath,
        });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedCollaborators = responses.reduce((combined, response) => {
        return combined.concat(response.library.collaborators.users.items);
      }, []);

      const formattedResponse: { data: ListLibraryCollaboratorsResponse } = {
        data: {
          library: {
            ...baseResponse.library,
            collaborators: {
              ...baseResponse.library.collaborators,
              users: {
                ...baseResponse.library.collaborators.users,
                items: combinedCollaborators,
              },
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListLibraryCollaboratorsResponse = await client.request(
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
