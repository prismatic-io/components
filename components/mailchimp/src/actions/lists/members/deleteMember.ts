import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listId, subscriberHash, connectionInput } from "../../../inputs";

export const deleteMember = action({
  display: {
    label: "Delete Member",
    description:
      "Delete all personally identifiable information related to a list member, and remove them from a list. This will make it impossible to re-import the list member",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/lists/${params.listId}/members/${params.subscriberHash}/actions/delete-permanent`,
    );
    return { data };
  },
  inputs: { listId, subscriberHash, connection: connectionInput },
});

export default deleteMember;
