import type { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { listBucketsInPlanExamplePayload } from "../../examplePayloads";
import { listBucketsInPlanOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { fetchAllPlanner } from "../../utils";
import { listBucketsInPlanInputs } from "../../inputs";
export const listBucketsInPlan = action({
  display: {
    label: "List Buckets in Plan",
    description: "List every bucket in a plan.",
  },
  inputs: listBucketsInPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBucketsInPlanOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, planId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllPlanner<PlannerBucket & Etagged>(
      client,
      PLANNER_ENDPOINTS.PLAN_BUCKETS(planId),
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { planId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listBucketsInPlanExamplePayload.data,
      value: listBucketsInPlanExamplePayload.data.value.map((bucket) => ({
        ...bucket,
        planId,
      })),
    },
  }),
  examplePayload: listBucketsInPlanExamplePayload,
});
