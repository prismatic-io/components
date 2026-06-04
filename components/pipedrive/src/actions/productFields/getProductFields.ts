import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getProductFields = action({
  display: {
    label: "Get Product Fields",
    description: "Gets all product fields.",
  },
  perform: async (context, { connection, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/productFields", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
