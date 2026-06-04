import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, filterIdInput } from "../../inputs";

export const getFilter = action({
  display: {
    label: "Get Filter",
    description: "Gets one filter.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/filters/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: filterIdInput,
  },
});
