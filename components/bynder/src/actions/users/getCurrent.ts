import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Retrieve the current user",
  },
  inputs: { connection },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/currentUser`);
    return { data };
  },
  examplePayload: {
    data: getUserResponse,
  },
});
