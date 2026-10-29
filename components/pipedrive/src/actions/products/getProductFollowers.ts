import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFollowersInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getProductFollowersExamplePayload } from "../../examplePayloads";
import { getProductFollowersOutputSchema } from "../../outputSchemas";

export const getProductFollowers = action({
  display: {
    label: "Get Product Followers",
    description: "Lists followers of a product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { limit, cursor } = {} },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/products/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: getProductFollowersInputs,
  examplePayload: getProductFollowersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFollowersOutputSchema,
  }),
});
