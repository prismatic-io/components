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
      problemReportedTime,
      problemDueByTime,
      problemClosedTime,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      problem: {
        reported_time: problemReportedTime,
        due_by_time: problemDueByTime,
        closed_time: problemClosedTime,
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
