import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput, query, userIdInput } from "../inputs";
import { createClient } from "../client";
import { listAllMessages } from "../utils";

export const selectMessage = dataSource({
  display: {
    label: "Select Message",
    description: "Select a message from the list of messages",
  },
  inputs: {
    connection: connectionInput,
    userId: userIdInput,
    query,
  },
  perform: async (context, { connection, userId, query }) => {
    const client = await createClient(connection);
    const data = await listAllMessages(
      client,
      {
        userId,
        q: query,
      },
      true,
      true,
    );
    const result = data.messages.map<Element>((message) => ({
      label: message.snippet,
      key: message.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
