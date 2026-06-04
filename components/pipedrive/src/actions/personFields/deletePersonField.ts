import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personFieldIdInput } from "../../inputs";

export const deletePersonField = action({
  display: {
    label: "Delete Person Field",
    description: "Deletes a person field.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/personFields/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personFieldIdInput,
  },
});
