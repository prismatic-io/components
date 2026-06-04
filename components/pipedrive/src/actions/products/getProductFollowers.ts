import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, productIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getProductFollowers = action({
  display: {
    label: "Get Product Followers",
    description: "Lists followers of a product.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/products/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
    limit: paginationLimitInput,
    cursor,
  },
});
