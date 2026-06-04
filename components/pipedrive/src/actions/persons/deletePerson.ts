import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deletePerson = action({
  display: {
    label: "Delete Person",
    description: "Deletes a person.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/persons/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
  },
});
