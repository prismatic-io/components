import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getContactInputs } from "../../inputs/contacts";
import { getContactExamplePayload } from "../../examplePayloads/contacts";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Returns a contact by its ID.",
  },
  perform: async (context, { connection, contactId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/contacts/${contactId}`);

    return {
      data,
    };
  },
  inputs: getContactInputs,
  examplePayload: getContactExamplePayload,
});
