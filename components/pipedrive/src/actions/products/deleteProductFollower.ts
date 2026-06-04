import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteProductFollower = action({
  display: {
    label: "Delete Product Follower",
    description: "Deletes a follower from a product.",
  },
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/products/${id}/followers/${followerId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
    followerId: input({
      label: "Follower ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the relationship between the follower and the product",
    }),
  },
});
