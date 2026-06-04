import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getLeadLabels = action({
  display: {
    label: "Get Lead Labels",
    description: "Gets all lead labels.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/leadLabels");
    return { data };
  },
  inputs: { connection: connectionInput },
});
