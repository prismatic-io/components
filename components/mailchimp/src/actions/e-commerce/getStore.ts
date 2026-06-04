import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { storeId, connectionInput } from "../../inputs";

export const getStore = action({
  display: {
    label: "Get Store",
    description: "Get information about a specific store",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(`/ecommerce/stores/${params.storeId}`);
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    connection: connectionInput,
  },
});

export default getStore;
