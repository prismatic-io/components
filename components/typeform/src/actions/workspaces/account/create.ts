import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { accountId, connection, workspaceName } from "../../../inputs";
import { getWorkspaceResponse as createWorkspaceResponse } from "../../../examplePayloads/workspaces";
import type { Workspace } from "../../../interfaces/workspace";

export const createAccountWorkspace = action({
  display: {
    label: "Create Account Workspace",
    description: "Create a workspace in a specific account.",
  },
  inputs: {
    accountId,
    workspaceName: {
      ...workspaceName,
      comments: "The name of the workspace account to create.",
    },
    connection,
  },
  perform: async (context, { connection, workspaceName, accountId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post<Workspace>(
      `/accounts/${accountId}/workspaces`,
      {
        name: workspaceName,
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createWorkspaceResponse,
  },
});
