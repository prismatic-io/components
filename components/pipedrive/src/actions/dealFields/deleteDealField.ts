import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealFieldIdInput } from "../../inputs";

export const deleteDealField = action({
  display: {
    label: "Delete Deal Field",
    description: "Deletes a deal field.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/dealFields/${id}`);
    return { data };
  },
  inputs: { connection: connectionInput, id: dealFieldIdInput },
});
