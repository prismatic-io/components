import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTaskExamplePayload } from "../examplePayloads";
import { PLANNER_ENDPOINTS } from "../constants";
import { fetchAllPlanner } from "../utils";
import { selectTaskInputs } from "../inputs";

export const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from a plan.",
  },
  inputs: selectTaskInputs,
  perform: async (_context, { connection, planId }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllPlanner<PlannerTask>(
      client,
      PLANNER_ENDPOINTS.PLAN_TASKS(planId),
    );

    const result = value.map<Element>((task) => ({
      label: util.types.toString(task.title),
      key: util.types.toString(task.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectTaskExamplePayload,
});
