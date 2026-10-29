import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { moveTaskToBucketExamplePayload } from "../../examplePayloads";
import { moveTaskToBucketOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { patchWithEtag } from "../../utils";
import { moveTaskToBucketInputs } from "../../inputs";
export const moveTaskToBucket = action({
  display: {
    label: "Move Task to Bucket",
    description:
      "Move a task into a different bucket. The destination bucket must belong to the same plan as the task.",
  },
  inputs: moveTaskToBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveTaskToBucketOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, taskId, bucketId, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await patchWithEtag<PlannerTask & Etagged>(
      client,
      PLANNER_ENDPOINTS.TASK(taskId),
      { bucketId },
      etag,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { bucketId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: { ...moveTaskToBucketExamplePayload.data, bucketId },
  }),
  examplePayload: moveTaskToBucketExamplePayload,
});
