import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProblemResponse as examplePayload } from "../../examplePayloads";
import { createProblemInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const createProblem = action({
  display: {
    label: "Create Problem",
    description: "Create a new problem",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
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
    const { data } = await client.post("/problems", payload);
    return { data };
  },
  examplePayload,
});
