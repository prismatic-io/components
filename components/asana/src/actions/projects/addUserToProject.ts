import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addUserToProjectExamplePayload } from "../../examplePayloads";
import { addUserToProjectInputs } from "../../inputs";
export const addUserToProject = action({
  display: {
    label: "Add Users to Project",
    description: "Add existing users to the given project.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/projects/${params.projectId}/addMembers`,
      {
        data: {
          members: params.members,
        },
      },
      {
        params: {
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: addUserToProjectInputs,
  examplePayload: addUserToProjectExamplePayload,
});
