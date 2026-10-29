import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteDealFollowerExamplePayload } from "../../examplePayloads";
import { deleteDealFollowerOutputSchema } from "../../outputSchemas";

export const deleteDealFollower = action({
  display: {
    label: "Delete Deal Follower",
    description: "Deletes a follower from a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(
      `/deals/${id}/followers/${followerId}`,
    );
    return { data };
  },
  inputs: deleteDealFollowerInputs,
  examplePayload: deleteDealFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealFollowerOutputSchema,
  }),
});
