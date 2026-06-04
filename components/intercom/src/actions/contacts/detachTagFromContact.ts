import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, idInput } from "../../inputs";
import { tagIdInput } from "../../inputs/contacts";

export const detachTag = action({
  display: {
    label: "Detach Tag from Contact",
    description: "Detach a Tag from a Contact",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...idInput,
      required: true,
      label: "Contact ID",
      dataSource: "selectContact",
    },
    tagId: tagIdInput,
  },
  perform: async (context, { connection, id, tagId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/contacts/${id}/tags/${tagId}`);
    return { data };
  },
});
