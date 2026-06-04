import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listWorkspaceProjectFoldersExamplePayload as examplePayload } from "../../examplePayloads";
import { listWorkspaceProjectFoldersInputs as inputs } from "../../inputs/workspaceProjects";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListWorkspaceProjectFoldersResponse from "../types/listWorkspaceProjectFolders";

export const listWorkspaceProjectFolders = action({
  display: {
    label: "List Workspace Project Folders",
    description:
      "Retrieve a list of the top-level folders in a Workspace Project. To browse further, use the Raw Request action.",
  },
  perform: async (
    context,
    { connection, ...configVars },
  ): Promise<{ data: ListWorkspaceProjectFoldersResponse }> => {
    const { projectId, page, limit, fetchAll } = configVars;

    const client = createClient({ connection, debug: context.debug.enabled });

    const query = gql`
      query listWorkspaceProjectFolders($projectId: ID!) {
        workspaceProject(id: $projectId) {
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
      const hasNextPath = [
        "workspaceProject",
        "browse",
        "folders",
        "hasNextPage",
      ];
      const responses: ListWorkspaceProjectFoldersResponse[] =
        await graphqlFetchAll({
          client,
          query,
          params: { projectId },
          hasNextPath,
        });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedFolders = responses.reduce((combined, response) => {
        return combined.concat(response.workspaceProject.browse.folders.items);
      }, []);

      const formattedResponse: { data: ListWorkspaceProjectFoldersResponse } = {
        data: {
          workspaceProject: {
            ...baseResponse.workspaceProject,
            browse: {
              ...baseResponse.workspaceProject.browse,
              folders: {
                ...baseResponse.workspaceProject.browse.folders,
                items: combinedFolders,
              },
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListWorkspaceProjectFoldersResponse = await client.request(
      query,
      { projectId, page, limit },
    );

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
