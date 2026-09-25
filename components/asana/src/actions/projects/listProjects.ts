import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import { listProjectsOutputSchema } from "../../outputSchemas";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "List all projects accessible to the authenticated user.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/projects`, {
      params: {
        offset: params.pagination.offset,
        limit: params.pagination.limit,
        workspace: params.workspaceId,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listProjectsInputs,
  examplePayload: listProjectsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectsOutputSchema,
  }),
});
