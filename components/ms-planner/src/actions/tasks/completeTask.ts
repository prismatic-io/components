import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PERCENT_COMPLETE_DONE, PLANNER_ENDPOINTS } from "../../constants";
import { completeTaskExamplePayload } from "../../examplePayloads";
import { completeTaskOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { patchWithEtag } from "../../utils";
import { completeTaskInputs } from "../../inputs";

export const completeTask = action({
  display: {
    label: "Complete Task",
    description: "Mark a task as complete.",
  },
  inputs: completeTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: completeTaskOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, taskId, etag }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await patchWithEtag<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK(taskId),
      { percentComplete: PERCENT_COMPLETE_DONE },
      etag,
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    completeTaskExamplePayload,
  examplePayload: completeTaskExamplePayload,
});
