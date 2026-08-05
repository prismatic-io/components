import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeFollowersFromTaskExamplePayload } from "../../examplePayloads";
import { removeFollowersFromTaskInputs } from "../../inputs";
export const removeFollowersFromTask = action({
  display: {
    label: "Remove Followers from Task",
    description: "Remove followers from the given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/tasks/${params.taskId}/removeFollowers`,
      {
        data: {
          followers: params.followersList,
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
  inputs: removeFollowersFromTaskInputs,
  examplePayload: removeFollowersFromTaskExamplePayload,
});
