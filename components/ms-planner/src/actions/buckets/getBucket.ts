import type { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { getBucketExamplePayload } from "../../examplePayloads";
import { getBucketOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { getBucketInputs } from "../../inputs";
export const getBucket = action({
  display: {
    label: "Get Bucket",
    description: "Retrieve a single bucket by its ID.",
  },
  inputs: getBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBucketOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, bucketId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<PlannerBucket & Etagged>(
      PLANNER_ENDPOINTS.BUCKET(bucketId),
    );
    return { data };
  },
  examplePayload: getBucketExamplePayload,
});
