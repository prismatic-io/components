import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { listTasksInPlanExamplePayload } from "../../examplePayloads";
import { listTasksInPlanOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { fetchAllPlanner } from "../../utils";
import { listTasksInPlanInputs } from "../../inputs";

export const listTasksInPlan = action({
  display: {
    label: "List Tasks in Plan",
    description: "List every task in a plan, across all of its buckets.",
  },
  inputs: listTasksInPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTasksInPlanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, planId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllPlanner<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.PLAN_TASKS(planId),
    );
    return { data };
  },
  examplePerform: async (_context, { planId }): Promise<{ data: unknown }> => ({
    data: {
      ...listTasksInPlanExamplePayload.data,
      value: listTasksInPlanExamplePayload.data.value.map((task) => ({
        ...task,
        planId,
      })),
    },
  }),
  examplePayload: listTasksInPlanExamplePayload,
});
