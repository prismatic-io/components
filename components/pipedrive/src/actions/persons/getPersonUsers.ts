import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";

export const getPersonUsers = action({
  display: {
    label: "Get Person Users",
    description: "Lists permitted users for a person.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/permittedUsers`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
  },
});
