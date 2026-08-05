import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getWorkspaceExamplePayload } from "../../examplePayloads";
import { getWorkspaceInputs } from "../../inputs";
export const getWorkspace = action({
  display: {
    label: "Get Workspace",
    description: "Get the information and metadata of the given workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/workspaces/${params.workspaceId}`);
    return { data };
  },
  inputs: getWorkspaceInputs,
  examplePayload: getWorkspaceExamplePayload,
});
