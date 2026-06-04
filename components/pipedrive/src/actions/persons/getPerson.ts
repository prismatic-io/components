import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getPerson = action({
  display: {
    label: "Get Person",
    description: "Gets details of a person.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/persons/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
  },
});
