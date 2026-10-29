import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ARCHIVE_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, idInput } from "../../inputs";

export const archiveContact = action({
  display: {
    label: "Archive Contact",
    description: "Archive an existing Contact",
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
    const { data } = await client.post(`/contacts/${id}/archive`);
    return { data };
  },
  examplePayload: ARCHIVE_CONTACT_EXAMPLE_PAYLOAD,
});
