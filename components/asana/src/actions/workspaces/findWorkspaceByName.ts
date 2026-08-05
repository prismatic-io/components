import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { findWorkspaceByNameExamplePayload } from "../../examplePayloads";
import { findWorkspaceByNameInputs } from "../../inputs";
import type { PaginatedResponse, Workspace } from "../../types";
export const findWorkspaceByName = action({
  display: {
    label: "Find Workspace by Name",
    description: "Find a workspace by name.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: PaginatedResponse<Workspace> = await client.get(
        "/workspaces",
        {
          params: { offset },
        },
      );
      const filteredData = response.data.data.filter(
        (workspace) => params.workspaceName === workspace.name,
      );
      if (filteredData.length === 1) {
        return { data: filteredData[0] };
      }
      offset = response.data.next_page?.offset;
      if (!offset) {
        stop = true;
      }
    }
    throw new Error(`No workspace named "${params.workspaceName}" found.`);
  },
  inputs: findWorkspaceByNameInputs,
  examplePayload: findWorkspaceByNameExamplePayload,
});
