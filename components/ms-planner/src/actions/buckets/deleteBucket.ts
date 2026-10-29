import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { deleteBucketExamplePayload } from "../../examplePayloads";
import { deleteWithEtag } from "../../utils";
import { deleteBucketInputs } from "../../inputs";
import { deleteBucketOutputSchema } from "../../outputSchemas";
export const deleteBucket = action({
  display: {
    label: "Delete Bucket",
    description: "Delete a bucket and the tasks it contains.",
  },
  inputs: deleteBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteBucketOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, bucketId, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    await deleteWithEtag(client, PLANNER_ENDPOINTS.BUCKET(bucketId), etag);
    return {
      data: {
        success: true,
        id: bucketId,
        message: "Bucket deleted successfully",
      },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteBucketExamplePayload,
  examplePayload: deleteBucketExamplePayload,
});
