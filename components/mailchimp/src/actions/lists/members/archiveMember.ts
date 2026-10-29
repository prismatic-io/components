import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listId, subscriberHash, connectionInput } from "../../../inputs";

export const archiveMember = action({
  display: {
    label: "Archive Member",
    description: "Archive a list member",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/lists/${params.listId}/members/${params.subscriberHash}`,
    );
    return { data };
  },
  inputs: { listId, subscriberHash, connection: connectionInput },
});

export default archiveMember;
