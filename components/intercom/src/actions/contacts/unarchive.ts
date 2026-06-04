import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, idInput } from "../../inputs";

export const unarchiveContact = action({
  display: {
    label: "Unarchive Contact",
    description: "Unarchive an archived Contact",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...idInput,
      required: true,
      label: "Contact ID",
      dataSource: "selectContact",
    },
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/contacts/${id}/unarchive`);
    return { data };
  },
  examplePayload: {
    data: {
      id: "5ba682d23d7cf92bef87bfd4",
      object: "contact",
      archived: false,
    },
  },
});
