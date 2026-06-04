import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealFieldIdInput } from "../../inputs";

export const getDealField = action({
  display: {
    label: "Get Deal Field",
    description: "Gets one deal field.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/dealFields/${id}`);
    return { data };
  },
  inputs: { connection: connectionInput, id: dealFieldIdInput },
});
