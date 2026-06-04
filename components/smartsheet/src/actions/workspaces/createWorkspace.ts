import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWorkspaceExamplePayload } from "../../examplePayloads";
import { createWorkspaceInputs } from "../../inputs";

export const createWorkspace = action({
  display: {
    label: "Create Workspace",
    description: "Creates a new workspace.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, name }) => {
    const client = createClient(connection, debug);
    const { data } = await client.post(`/workspaces`, { name });
    return { data };
  },
  inputs: createWorkspaceInputs,
  examplePayload: createWorkspaceExamplePayload,
});
