import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Gets one product.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/products/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
  },
});
