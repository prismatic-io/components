import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { listTasksInBucketExamplePayload } from "../../examplePayloads";
import { listTasksInBucketOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { fetchAllPlanner } from "../../utils";
import { listTasksInBucketInputs } from "../../inputs";
export const listTasksInBucket = action({
  display: {
    label: "List Tasks in Bucket",
    description: "List every task in a single bucket.",
  },
  inputs: listTasksInBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTasksInBucketOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, bucketId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllPlanner<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.BUCKET_TASKS(bucketId),
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { planId, bucketId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listTasksInBucketExamplePayload.data,
      value: listTasksInBucketExamplePayload.data.value.map((task) => ({
        ...task,
        planId,
        bucketId,
      })),
    },
  }),
  examplePayload: listTasksInBucketExamplePayload,
});
