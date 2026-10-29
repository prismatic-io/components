import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPlanExamplePayload } from "../examplePayloads";
import { PLANNER_ENDPOINTS } from "../constants";
import { computeEndpointBasedOnConnection, fetchAllPlanner } from "../utils";
import { selectPlanInputs } from "../inputs";
export const selectPlan = dataSource({
  display: {
    label: "Select Plan",
    description:
      "Select a plan from a group, or from the plans shared with the user.",
  },
  inputs: selectPlanInputs,
  perform: async (_context, { connection, groupId }) => {
    const client = createClient(connection, false);
    const endpoint = groupId
      ? PLANNER_ENDPOINTS.GROUP_PLANS(groupId)
      : computeEndpointBasedOnConnection(
          connection,
          PLANNER_ENDPOINTS.USER_PLANS,
        );
    const { value } = await fetchAllPlanner<PlannerPlan>(client, endpoint);
    const result = value.map<Element>((plan) => ({
      label: util.types.toString(plan.title),
      key: util.types.toString(plan.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectPlanExamplePayload,
});
