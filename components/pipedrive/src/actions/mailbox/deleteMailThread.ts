import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, mailThreadIdInput } from "../../inputs";

export const deleteMailThread = action({
  display: {
    label: "Delete Mail Thread",
    description: "Deletes a mail thread.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/mailbox/mailThreads/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: mailThreadIdInput,
  },
});
