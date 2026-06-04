import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, mailThreadIdInput } from "../../inputs";

export const getMailThread = action({
  display: {
    label: "Get Mail Thread",
    description: "Gets one mail thread.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/mailbox/mailThreads/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: mailThreadIdInput,
  },
});
