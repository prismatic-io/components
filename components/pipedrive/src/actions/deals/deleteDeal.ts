import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteDeal = action({
  display: {
    label: "Delete Deal",
    description: "Deletes a deal.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/deals/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
  },
});
