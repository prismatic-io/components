import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createTagExamplePayload } from "../../examplePayloads";
import { createTagInputs } from "../../inputs";
export const createTag = action({
  display: {
    label: "Create Tag",
    description: "Create a new tag in a workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/tags`,
      {
        data: {
          color: params.color,
          followers: params.followersList,
          name: params.name,
          notes: params.notes,
          workspace: params.workspaceId,
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
  inputs: createTagInputs,
  examplePayload: createTagExamplePayload,
});
