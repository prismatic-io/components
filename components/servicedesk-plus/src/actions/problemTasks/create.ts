import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProblemTaskResponse as examplePayload } from "../../examplePayloads";
import { createProblemTaskInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const createProblemTask = action({
  display: {
    label: "Create Problem Task",
    description: "Create a problem task",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskProblemId,
      taskTitle,
      taskDescription,
      taskType,
      taskOwner,
      estimatedEffortMinutes,
      estimatedEffortHours,
      estimatedEffortDays,
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
        estimated_effort_days: estimatedEffortDays,
        estimated_effort_hours: estimatedEffortHours,
        estimated_effort_minutes: estimatedEffortMinutes,
        group,
        percentage_completion: percentageCompletion,
        task_type: taskType,
        ...additionalFields,
      },
    });
    const { data } = await client.post(
      `/problems/${taskProblemId}/tasks`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
