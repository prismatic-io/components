import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addFollowersToTaskExamplePayload } from "../../examplePayloads";
import { addFollowersToTaskInputs } from "../../inputs";
export const addFollowersToTask = action({
  display: {
    label: "Add Followers to Task",
    description: "Add followers to an existing task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/tasks/${params.taskId}/addFollowers`,
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
  inputs: addFollowersToTaskInputs,
  examplePayload: addFollowersToTaskExamplePayload,
});
