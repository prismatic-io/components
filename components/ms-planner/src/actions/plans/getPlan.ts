import type { PlannerPlan } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { getPlanExamplePayload } from "../../examplePayloads";
import { getPlanOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { getPlanInputs } from "../../inputs";

export const getPlan = action({
  display: {
    label: "Get Plan",
    description: "Retrieve a single plan by its ID.",
  },
  inputs: getPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPlanOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, planId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<PlannerPlan & Etagged>(
      PLANNER_ENDPOINTS.PLAN(planId),
    );
    return { data };
  },
  examplePayload: getPlanExamplePayload,
});
