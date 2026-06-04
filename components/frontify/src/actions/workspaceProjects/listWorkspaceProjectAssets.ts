import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listWorkspaceProjectAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listWorkspaceProjectAssetsInputs as inputs } from "../../inputs/workspaceProjects";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListWorkspaceProjectAssetsResponse from "../types/listWorkspaceProjectAssets";

export const listWorkspaceProjectAssetsQuery = gql`
  query listWorkspaceProjectAssets(
    $projectId: ID!
    $page: Int
    $limit: Int
    $query: AssetQueryInput
  ) {
    workspaceProject(id: $projectId) {
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

export const listWorkspaceProjectAssets = action({
  display: {
    label: "List Workspace Project Assets",
    description: "Retrieve a list of Assets belonging to a Workspace Project.",
  },
  perform: async (
    context,
    {
      connection,
      projectId,
      page,
      limit,
      fetchAll,
      assetSearch,
      assetExternalId,
    },
  ): Promise<{ data: ListWorkspaceProjectAssetsResponse }> => {
    const query = { search: assetSearch, externalId: assetExternalId };

    const client = createClient({ connection, debug: context.debug.enabled });

    if (fetchAll) {
      const hasNextPath = ["workspaceProject", "assets", "hasNextPage"];
      const responses: ListWorkspaceProjectAssetsResponse[] =
        await graphqlFetchAll({
          client,
          query: listWorkspaceProjectAssetsQuery,
          params: { projectId, query },
          hasNextPath,
        });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedAssets = responses.reduce((combined, response) => {
        return combined.concat(response.workspaceProject.assets.items);
      }, []);

      const formattedResponse: { data: ListWorkspaceProjectAssetsResponse } = {
        data: {
          workspaceProject: {
            ...baseResponse.workspaceProject,
            assets: {
              ...baseResponse.workspaceProject.assets,
              items: combinedAssets,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListWorkspaceProjectAssetsResponse = await client.request(
      listWorkspaceProjectAssetsQuery,
      { projectId, page, limit, query },
    );

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
