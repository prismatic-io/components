import type { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DEFAULT_ORDER_HINT, PLANNER_ENDPOINTS } from "../../constants";
import { createBucketExamplePayload } from "../../examplePayloads";
import { createBucketOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { createBucketInputs } from "../../inputs";

export const createBucket = action({
  display: {
    label: "Create Bucket",
    description: "Create a bucket in a plan.",
  },
  inputs: createBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBucketOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, planId, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post<PlannerBucket & Etagged>(
      PLANNER_ENDPOINTS.BUCKETS,
      {
        name,
        planId,
        orderHint: DEFAULT_ORDER_HINT,
      },
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { planId, name },
  ): Promise<{ data: unknown }> => ({
    data: { ...createBucketExamplePayload.data, name, planId },
  }),
  examplePayload: createBucketExamplePayload,
});
