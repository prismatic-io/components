import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id, operations } from "../../inputs";
import { genericUpdateResponse } from "../../examplePayloads/general";
import { updateWorkspaceInput } from "../../exampleInputs/workspaces";
import { OPERATIONS_APPLIED } from "../../constants";

export const updateWorkspace = action({
  display: {
    label: "Update Workspace",
    description: "Update a workspace.",
  },
  inputs: {
    id: {
      ...id,
      label: "Workspace Id",
      comments: "The workspace Id to update.",
      dataSource: "selectWorkspaces",
    },
    operations: {
      ...operations,
      example: JSON.stringify(updateWorkspaceInput, null, 2),
    },
    connection,
  },
  perform: async (context, { connection, id, operations }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.patch(`/workspaces/${id}`, operations);
    return {
      data: {
        message: OPERATIONS_APPLIED,
      },
    };
  },
  examplePayload: {
    data: genericUpdateResponse,
  },
});
