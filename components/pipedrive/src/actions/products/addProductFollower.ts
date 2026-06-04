import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const addProductFollower = action({
  display: {
    label: "Add Product Follower",
    description: "Adds a follower to a product.",
  },
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post(`/products/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
    userId: input({
      label: "User ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the user",
    }),
  },
});
