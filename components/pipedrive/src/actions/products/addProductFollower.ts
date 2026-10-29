import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addProductFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addProductFollowerExamplePayload } from "../../examplePayloads";
import { addProductFollowerOutputSchema } from "../../outputSchemas";

export const addProductFollower = action({
  display: {
    label: "Add Product Follower",
    description: "Adds a follower to a product.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post(`/products/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: addProductFollowerInputs,
  examplePayload: addProductFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addProductFollowerOutputSchema,
  }),
});
