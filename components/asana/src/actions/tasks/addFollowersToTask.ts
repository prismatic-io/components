import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import {
  connectionInput,
  taskId,
  followersList,
  optFields,
} from "../../inputs";
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
  inputs: {
    asanaConnection: connectionInput,
    taskId,
    followersList,
    optFields: { ...optFields, default: "created_at,followers,name,workspace" },
  },
  examplePayload: {
    data: {
      data: {
        gid: "1202461451752271",
        resource_type: "task",
        created_at: "2022-06-16T21:17:30.519Z",
        name: "My task name",
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
        followers: [{ gid: "1202178852626547", resource_type: "user" }],
      },
    },
  },
});
