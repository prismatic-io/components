import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getWorkspaceExamplePayload as examplePayload } from "../../examplePayloads";
import { getWorkspaceInputs as inputs } from "../../inputs/workspaces";

export const getWorkspace = action({
  display: {
    label: "Get Workspace",
    description: "Retrieves details of a workspace by ID.",
  },
  perform: async (
    context,
    { connection, workspaceId, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/workspaces/${workspaceId}`, {
      params: additionalQueryParams,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
