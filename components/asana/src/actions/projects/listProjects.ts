import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "List all projects accessible to the authenticated user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/projects`, {
      params: {
        offset: params.pagination.offset,
        limit: params.pagination.limit,
        workspace: params.workspaceId || undefined,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listProjectsInputs,
  examplePayload: listProjectsExamplePayload,
});
