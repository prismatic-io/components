import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getWorkspaceExamplePayload as examplePayload } from "../../examplePayloads";
import { getWorkspaceInputs as inputs } from "../../inputs";
import { getWorkspaceOutputSchema } from "../../outputSchemas";
export const getWorkspace = action({
  display: {
    label: "Get Workspace",
    description: "Retrieves details of a workspace by ID.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, workspaceId, additionalQueryParams },
  ) => {
    if (!workspaceId) {
      throw new Error(
        "Workspace ID is required. Select a workspace, or use the List Workspaces action to find one.",
      );
    }
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/workspaces/${workspaceId}`, {
      params: additionalQueryParams,
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkspaceOutputSchema,
  }),
  inputs,
  examplePayload,
});
