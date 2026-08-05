import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users accessible to the authenticated user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users`, {
      params: {
        offset: params.pagination.offset,
        limit: params.pagination.limit,
        workspace: params.workspaceId || undefined,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
});
