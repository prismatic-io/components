import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addUserExamplePayload } from "../../examplePayloads";
import { addUserInputs } from "../../inputs";
export const addUser = action({
  display: {
    label: "Add User to Workspace",
    description: "Add a new user to the given workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/workspaces/${params.workspaceId}/addUser`,
      {
        data: { user: params.userId },
      },
    );
    return { data };
  },
  inputs: addUserInputs,
  examplePayload: addUserExamplePayload,
});
