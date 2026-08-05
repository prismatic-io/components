import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listTeamsExamplePayload } from "../../examplePayloads";
import { listTeamsInputs } from "../../inputs";
export const listTeams = action({
  display: {
    label: "List Teams",
    description: "List all teams within a given workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/workspaces/${params.workspaceId}/teams`,
    );
    return { data };
  },
  inputs: listTeamsInputs,
  examplePayload: listTeamsExamplePayload,
});
