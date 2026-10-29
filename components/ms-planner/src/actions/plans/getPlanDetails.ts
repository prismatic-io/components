import type { PlannerPlanDetails } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { getPlanDetailsExamplePayload } from "../../examplePayloads";
import { getPlanDetailsOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { getPlanDetailsInputs } from "../../inputs";

export const getPlanDetails = action({
  display: {
    label: "Get Plan Details",
    description: "Retrieve a plan's category labels and shared-with list.",
  },
  inputs: getPlanDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPlanDetailsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, planId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<PlannerPlanDetails & Etagged>(
      PLANNER_ENDPOINTS.PLAN_DETAILS(planId),
    );
    return { data };
  },
  examplePayload: getPlanDetailsExamplePayload,
});
