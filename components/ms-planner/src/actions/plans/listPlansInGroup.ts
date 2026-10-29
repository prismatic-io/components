import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  GRAPH_API_VERSION,
  GRAPH_BASE_URL,
  PLANNER_ENDPOINTS,
} from "../../constants";
import { listPlansInGroupExamplePayload } from "../../examplePayloads";
import { listPlansInGroupOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { fetchAllPlanner } from "../../utils";
import { listPlansInGroupInputs } from "../../inputs";

export const listPlansInGroup = action({
  display: {
    label: "List Plans in Group",
    description: "List every plan contained by a Microsoft 365 group.",
  },
  inputs: listPlansInGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPlansInGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllPlanner<PlannerPlan & Etagged>(
      client,
      PLANNER_ENDPOINTS.GROUP_PLANS(groupId),
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { groupId },
  ): Promise<{ data: unknown }> => ({
    data: {
      ...listPlansInGroupExamplePayload.data,
      value: listPlansInGroupExamplePayload.data.value.map((plan) => ({
        ...plan,
        owner: groupId,
        container: {
          ...plan.container,
          containerId: groupId,
          url: `${GRAPH_BASE_URL}/${GRAPH_API_VERSION}/groups/${groupId}`,
        },
      })),
    },
  }),
  examplePayload: listPlansInGroupExamplePayload,
});
