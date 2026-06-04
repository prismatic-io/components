import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GET_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, idInput } from "../../inputs";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieves an existing Contact",
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
    const { data } = await client.get(`/contacts/${id}`);

    return { data };
  },
  examplePayload: GET_CONTACT_EXAMPLE_PAYLOAD,
});
