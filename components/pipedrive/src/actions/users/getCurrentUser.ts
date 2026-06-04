import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Gets current user data.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: { connection: connectionInput },
});
