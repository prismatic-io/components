import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateRequestTaskResponse as examplePayload } from "../../examplePayloads";
import { updateRequestTaskInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const updateRequestTask = action({
  display: {
    label: "Update Request Task",
    description: "Update a request task",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskRequestId,
      toUpdateRequestTaskId,
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
    const { data } = await client.put(
      `/requests/${taskRequestId}/tasks/${toUpdateRequestTaskId}`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
