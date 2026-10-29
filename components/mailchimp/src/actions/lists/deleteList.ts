import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listId, connectionInput } from "../../inputs";

export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Delete a list from your Mailchimp account",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(`/lists/${params.listId}`);
    return { data };
  },
  inputs: { listId, connection: connectionInput },
});

export default deleteList;
