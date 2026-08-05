import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listWorkspacesExamplePayload } from "../../examplePayloads";
import { listWorkspacesInputs } from "../../inputs";
export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "List all workspaces accessible to the authenticated user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/workspaces", {
      params: {
        limit: params.pagination.limit,
        offset: params.pagination.offset,
      },
    });
    return { data };
  },
  inputs: listWorkspacesInputs,
  examplePayload: listWorkspacesExamplePayload,
});
