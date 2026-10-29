import type { PlannerTaskDetails } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { getTaskDetailsExamplePayload } from "../../examplePayloads";
import { getTaskDetailsOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { getTaskDetailsInputs } from "../../inputs";
export const getTaskDetails = action({
  display: {
    label: "Get Task Details",
    description: "Retrieve a task's description, checklist, and links.",
  },
  inputs: getTaskDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTaskDetailsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, taskId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<PlannerTaskDetails & Etagged>(
      PLANNER_ENDPOINTS.TASK_DETAILS(taskId),
    );
    return { data };
  },
  examplePayload: getTaskDetailsExamplePayload,
});
