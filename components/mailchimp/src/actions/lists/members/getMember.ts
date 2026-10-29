import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listId, subscriberHash, connectionInput } from "../../../inputs";

export const getMember = action({
  display: {
    label: "Get Member",
    description:
      "Get information about a specific list member, including a currently subscribed, unsubscribed, or bounced member",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/lists/${params.listId}/members/${params.subscriberHash}`,
    );
    return { data };
  },
  inputs: { listId, subscriberHash, connection: connectionInput },
});

export default getMember;
