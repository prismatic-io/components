import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get metadata about the authenticated user",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.getProfile({ userId: "me" });
    return { data };
  },
  examplePayload: {
    data: {
      emailAddress: "example@gmail.com",
      historyId: "1234567",
      messagesTotal: 12345,
      threadsTotal: 12345,
    },
  },
});

export default { getCurrentUser };
