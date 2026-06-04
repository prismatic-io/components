import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getLeadSources = action({
  display: {
    label: "Get Lead Sources",
    description: "Gets all lead sources.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/leadSources");
    return { data };
  },
  inputs: { connection: connectionInput },
});
