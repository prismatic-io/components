import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getNoteFields = action({
  display: {
    label: "Get Note Fields",
    description: "Gets all note fields.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/noteFields");
    return { data };
  },
  inputs: { connection: connectionInput },
});
