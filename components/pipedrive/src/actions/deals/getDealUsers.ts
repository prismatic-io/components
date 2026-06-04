import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";

export const getDealUsers = action({
  display: {
    label: "Get Deal Users",
    description: "Lists permitted users for a deal.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/permittedUsers`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
  },
});
