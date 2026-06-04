import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskMembersExamplePayload } from "../../examplePayloads";
import { connectionInput, getTaskId } from "../../inputs";

const taskId = getTaskId(true, "Task ID");

export const getTaskMembers = action({
  display: {
    label: "Get Task Members",
    description: "List the members assigned to a task.",
  },
  examplePayload: getTaskMembersExamplePayload,
  perform: async (context, { clickUpConnection, taskId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/task/${taskId}/member`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    taskId,
  },
});
