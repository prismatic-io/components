import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, leadIdInput } from "../../inputs";

export const deleteLead = action({
  display: {
    label: "Delete Lead",
    description: "Deletes a lead.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/leads/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: leadIdInput,
  },
});
