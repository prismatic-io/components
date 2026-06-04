import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWorkspaceExamplePayload } from "../../examplePayloads";
import { deleteWorkspaceInputs } from "../../inputs";

export const deleteWorkspace = action({
  display: {
    label: "Delete Workspace",
    description: "Deletes a workspace by its ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, workspaceId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.delete(`/workspaces/${workspaceId}`);
    return { data };
  },
  inputs: deleteWorkspaceInputs,
  examplePayload: deleteWorkspaceExamplePayload,
});
