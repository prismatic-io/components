import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, leadLabelIdInput } from "../../inputs";

export const deleteLeadLabel = action({
  display: {
    label: "Delete Lead Label",
    description: "Deletes a lead label.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/leadLabels/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: leadLabelIdInput,
  },
});
