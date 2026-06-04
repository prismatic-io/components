import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getPersonFields = action({
  display: {
    label: "Get Person Fields",
    description: "Gets all person fields.",
  },
  perform: async (context, { connection, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/personFields", {
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
