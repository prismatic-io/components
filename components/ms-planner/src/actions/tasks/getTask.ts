import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTaskOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { getTaskInputs } from "../../inputs";
export const getTask = action({
  display: {
    label: "Get Task",
    description: "Retrieve a single task by its ID.",
  },
  inputs: getTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTaskOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, taskId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<PlannerTask & Etagged>(
      PLANNER_ENDPOINTS.TASK(taskId),
    );
    return { data };
  },
  examplePayload: getTaskExamplePayload,
});
