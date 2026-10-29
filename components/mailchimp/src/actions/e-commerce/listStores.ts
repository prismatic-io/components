import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const listStores = action({
  display: {
    label: "List Stores",
    description: "Get information about all stores in the account",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/ecommerce/stores");
    return { data };
  },
  inputs: { connection: connectionInput },
});

export default listStores;
