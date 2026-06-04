import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, mailThreadIdInput } from "../../inputs";

export const getMailThreadMessages = action({
  display: {
    label: "Get Mail Thread Messages",
    description: "Gets all mail messages of a mail thread.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/mailbox/mailThreads/${id}/mailMessages`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: mailThreadIdInput,
  },
});
