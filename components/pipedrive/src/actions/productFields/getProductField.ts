import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getProductField = action({
  display: {
    label: "Get Product Field",
    description: "Gets one product field.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/productFields/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: input({
      label: "Product Field ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the product field",
    }),
  },
});
