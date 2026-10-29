import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  GRAPH_API_VERSION,
  GRAPH_BASE_URL,
  PLANNER_ENDPOINTS,
} from "../../constants";
import { createPlanExamplePayload } from "../../examplePayloads";
import { createPlanOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { createPlanInputs } from "../../inputs";

export const createPlan = action({
  display: {
    label: "Create Plan",
    description:
      "Create a plan inside a Microsoft 365 group. The caller must already be a member of that group; creating a group does not add its creator as a member, which is a common cause of a permissions error here.",
  },
  inputs: createPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPlanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId, title }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post<PlannerPlan & Etagged>(
      PLANNER_ENDPOINTS.PLANS,
      {
        container: { containerId: groupId, type: "group" },
        title,
      },
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { groupId, title },
  ): Promise<{ data: unknown }> => ({
    data: {
      ...createPlanExamplePayload.data,
      title,
      owner: groupId,
      container: {
        ...createPlanExamplePayload.data.container,
        containerId: groupId,
        url: `${GRAPH_BASE_URL}/${GRAPH_API_VERSION}/groups/${groupId}`,
      },
    },
  }),
  examplePayload: createPlanExamplePayload,
});
