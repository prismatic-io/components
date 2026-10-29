import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listId, connectionInput } from "../../inputs";

export const getList = action({
  display: {
    label: "Get List",
    description:
      "Get information about a specific list in your Mailchimp account. Results include list members who have signed up but haven't confirmed their subscription yet and unsubscribed or cleaned.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(`/lists/${params.listId}`);
    return { data };
  },
  inputs: { listId, connection: connectionInput },
});

export default getList;
