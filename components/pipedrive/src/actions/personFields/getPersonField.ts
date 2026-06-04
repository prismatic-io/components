import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personFieldIdInput } from "../../inputs";

export const getPersonField = action({
  display: {
    label: "Get Person Field",
    description: "Gets one person field.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/personFields/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personFieldIdInput,
  },
});
