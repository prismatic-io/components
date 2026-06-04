import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getUsers = action({
  display: {
    label: "Get Users",
    description: "Gets all users.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users");
    return { data };
  },
  inputs: { connection: connectionInput },
});
