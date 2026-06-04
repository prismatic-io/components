import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRequestTaskResponse as examplePayload } from "../../examplePayloads";
import { createRequestTaskInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const createRequestTask = action({
  display: {
    label: "Create Request Task",
    description: "Create a new request task",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskRequestId,
      taskRequestTitle,
      taskRequestPercentageCompletion,
      taskRequestEstimatedEffortHours,
      taskRequestDescription,
      taskRequestOwner,
      taskRequestAdditionalCost,
      taskRequestActualEndTime,
      taskRequestActualStartTime,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      task: {
        percentage_completion: taskRequestPercentageCompletion,
        estimated_effort_hours: taskRequestEstimatedEffortHours,
        description: taskRequestDescription,
        title: taskRequestTitle,
        additional_cost: taskRequestAdditionalCost,
        actual_end_time: taskRequestActualEndTime,
        actual_start_time: taskRequestActualStartTime,
        owner: taskRequestOwner,
        ...additionalFields,
      },
    });
    const { data } = await client.post(
      `/requests/${taskRequestId}/tasks`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
