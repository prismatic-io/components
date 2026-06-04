import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getUserSettings = action({
  display: {
    label: "Get User Settings",
    description: "Lists settings of an authorized user.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/userSettings");
    return { data };
  },
  inputs: { connection: connectionInput },
});
