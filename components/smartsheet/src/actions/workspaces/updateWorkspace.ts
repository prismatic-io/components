import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateWorkspaceExamplePayload } from "../../examplePayloads";
import { updateWorkspaceInputs } from "../../inputs";

export const updateWorkspace = action({
  display: {
    label: "Update Workspace",
    description: "Updates the properties of a workspace.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, workspaceId, name },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.put(`/workspaces/${workspaceId}`, { name });
    return { data };
  },
  inputs: updateWorkspaceInputs,
  examplePayload: updateWorkspaceExamplePayload,
});
