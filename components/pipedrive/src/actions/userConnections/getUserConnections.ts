import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getUserConnections = action({
  display: {
    label: "Get User Connections",
    description: "Gets all user connections.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/userConnections");
    return { data };
  },
  inputs: { connection: connectionInput },
});
