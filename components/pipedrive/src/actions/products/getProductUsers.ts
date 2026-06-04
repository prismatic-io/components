import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, productIdInput } from "../../inputs";

export const getProductUsers = action({
  display: {
    label: "Get Product Users",
    description: "Lists permitted users for a product.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/products/${id}/permittedUsers`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: productIdInput,
  },
});
