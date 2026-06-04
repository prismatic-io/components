import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getWorkspaceProjectExamplePayload as examplePayload } from "../../examplePayloads";
import { getWorkspaceProjectInputs as inputs } from "../../inputs/workspaceProjects";

export const getWorkspaceProject = action({
  display: {
    label: "Get Workspace Project",
    description: "Retrieve a Workspace Project by its ID.",
  },
  perform: async (context, { connection, projectId }) => {
    const query = gql`
      query getWorkspaceProject($projectId: ID!) {
        workspaceProject(id: $projectId) {
          id
          name
          color {
            red
            green
            blue
            alpha
          }
          licenses {
            id
            title
            license
            addByDefault
            requireConsensus
          }
          collaborators {
            users {
              total
              hasNextPage
              page
              limit
              items {
                id
                name
                email
              }
            }
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
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query, { projectId });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
