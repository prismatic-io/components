import type { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { updateBucketExamplePayload } from "../../examplePayloads";
import { updateBucketOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { patchWithEtag } from "../../utils";
import { updateBucketInputs } from "../../inputs";

export const updateBucket = action({
  display: {
    label: "Update Bucket",
    description:
      "Rename a bucket. A bucket cannot be moved to a different plan.",
  },
  inputs: updateBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateBucketOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, bucketId, name, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await patchWithEtag<PlannerBucket & Etagged>(
      client,
      PLANNER_ENDPOINTS.BUCKET(bucketId),
      { name },
      etag,
    );
    return { data };
  },
  examplePerform: async (_context, { name }): Promise<{ data: unknown }> => ({
    data: { ...updateBucketExamplePayload.data, name },
  }),
  examplePayload: updateBucketExamplePayload,
});
