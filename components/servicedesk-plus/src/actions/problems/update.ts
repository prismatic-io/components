import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProblemResponse as examplePayload } from "../../examplePayloads";
import { updateProblemInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";
export const updateProblem = action({
  display: {
    label: "Update Problem",
    description: "Update an existing problem",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      toUpdateProblemId,
      problemTitle,
      problemDescription,
      problemTimes,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      problem: {
        reported_time: problemTimes.problemReportedTime,
        due_by_time: problemTimes.problemDueByTime,
        closed_time: problemTimes.problemClosedTime,
        title: problemTitle,
        description: problemDescription,
        ...additionalFields,
      },
    });
    const { data } = await client.put(
      `/problems/${toUpdateProblemId}`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
