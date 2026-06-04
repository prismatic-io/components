import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, leadIdInput } from "../../inputs";

export const getLead = action({
  display: {
    label: "Get Lead",
    description: "Gets one lead.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/leads/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: leadIdInput,
  },
});
