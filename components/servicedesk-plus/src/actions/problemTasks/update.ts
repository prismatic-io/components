import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProblemTaskResponse as examplePayload } from "../../examplePayloads";
import { updateProblemTaskInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";
export const updateProblemTask = action({
  display: {
    label: "Update Problem Task",
    description: "Update a problem task",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskProblemId,
      toUpdateTaskId,
      taskTitle,
      taskDescription,
      taskType,
      taskOwner,
      estimatedEffort,
      percentageCompletion,
      group,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      task: {
        owner: taskOwner,
        title: taskTitle,
        description: taskDescription,
        estimated_effort_days: estimatedEffort.estimatedEffortDays,
        estimated_effort_hours: estimatedEffort.estimatedEffortHours,
        estimated_effort_minutes: estimatedEffort.estimatedEffortMinutes,
        group,
        percentage_completion: percentageCompletion,
        task_type: taskType,
        ...additionalFields,
      },
    });
    const { data } = await client.put(
      `/problems/${taskProblemId}/tasks/${toUpdateTaskId}`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
