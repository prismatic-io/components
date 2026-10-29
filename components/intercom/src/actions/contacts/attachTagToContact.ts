import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, idInput } from "../../inputs";
import { tagIdInput } from "../../inputs/contacts";

export const attachTag = action({
  display: {
    label: "Attach Tag to Contact",
    description: "Attach a Tag to a Contact",
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
    const { data } = await client.post(`/contacts/${id}/tags`, { id: tagId });
    return { data };
  },
});
