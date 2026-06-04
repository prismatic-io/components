import { dataSource, input, util } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../client";
import { connection } from "../inputs/sharedInputs";
import type { FolderItem, WorkspaceProjectFoldersResponse } from "../types";

const projectId = input({
  label: "Workspace Project ID",
  type: "string",
  required: true,
  comments: "ID of the Workspace Project entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
});

const query = gql`
  query listWorkspaceProjectFolders($projectId: ID!) {
    workspaceProject(id: $projectId) {
      browse {
        folders {
          items {
            id
            name
          }
        }
      }
    }
  }
`;

export const selectWorkspaceProjectFolder = dataSource({
  display: {
    label: "Select Workspace Project Folder",
    description: "A picklist of top-level folders in a Workspace Project.",
  },
  inputs: {
    connection,
    projectId,
  },
  perform: async (_context, { connection, projectId }) => {
    const client = createClient({ connection, debug: false });
    const response: WorkspaceProjectFoldersResponse = await client.request(
      query,
      { projectId },
    );
    const items: FolderItem[] =
      response?.workspaceProject?.browse?.folders?.items ?? [];
    return {
      result: items.map((item) => ({
        key: item.id,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Folder", key: "eyJpZGVudGlmaWVyIjoiMSJ9" }],
  },
});
