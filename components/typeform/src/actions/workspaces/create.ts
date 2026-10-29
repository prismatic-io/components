import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, workspaceName } from "../../inputs";
import { getWorkspaceResponse as createWorkspaceResponse } from "../../examplePayloads/workspaces";
import type { Workspace } from "../../interfaces/workspace";

export const createWorkspace = action({
  display: {
    label: "Create Workspace",
    description: "Create a workspace.",
  },
  inputs: {
    workspaceName,
    connection,
  },
  perform: async (context, { connection, workspaceName }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post<Workspace>(`/workspaces`, {
      name: workspaceName,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createWorkspaceResponse,
  },
});
