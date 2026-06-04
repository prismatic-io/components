import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DELETE_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, idInput } from "../../inputs";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete an existing Contact",
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
    const { data } = await client.delete(`/contacts/${id}`);
    return { data };
  },
  examplePayload: DELETE_CONTACT_EXAMPLE_PAYLOAD,
});
