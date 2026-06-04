import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";

export const deletePersonPicture = action({
  display: {
    label: "Delete Person Picture",
    description: "Deletes a person picture.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/persons/${id}/picture`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
  },
});
