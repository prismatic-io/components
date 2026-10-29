import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBrandsResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const listBrands = action({
  display: {
    label: "List Brands",
    description: "Retrieve all brands",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/brands`);
    return { data };
  },
  examplePayload: {
    data: listBrandsResponse,
  },
});
