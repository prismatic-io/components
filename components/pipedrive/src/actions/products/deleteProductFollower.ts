import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProductFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteProductFollowerExamplePayload } from "../../examplePayloads";
import { deleteProductFollowerOutputSchema } from "../../outputSchemas";
export const deleteProductFollower = action({
  display: {
    label: "Delete Product Follower",
    description: "Deletes a follower from a product.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(
      `/products/${id}/followers/${followerId}`,
    );
    return { data };
  },
  inputs: deleteProductFollowerInputs,
  examplePayload: deleteProductFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductFollowerOutputSchema,
  }),
});
