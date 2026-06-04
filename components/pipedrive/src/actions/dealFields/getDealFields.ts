import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getDealFields = action({
  display: {
    label: "Get Deal Fields",
    description: "Gets all deal fields.",
  },
  perform: async (context, { connection, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/dealFields", {
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
