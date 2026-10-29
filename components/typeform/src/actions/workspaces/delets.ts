import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id } from "../../inputs";
import { genericDeleteResponse } from "../../examplePayloads/general";
import { DELETED_RESOURCE } from "../../constants";

export const deleteWorkspace = action({
  display: {
    label: "Delete Workspace",
    description: "Delete a workspace.",
  },
  inputs: {
    id: {
      ...id,
      label: "Workspace Id",
      comments: "The workspace Id to delete.",
      dataSource: "selectWorkspaces",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/workspaces/${id}`);
    return {
      data: {
        message: DELETED_RESOURCE,
      },
    };
  },
  examplePayload: {
    data: genericDeleteResponse,
  },
});
