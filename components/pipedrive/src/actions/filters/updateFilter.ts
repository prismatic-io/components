import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, filterIdInput } from "../../inputs";
import { cleanString } from "../../util";

export const updateFilter = action({
  display: {
    label: "Update Filter",
    description: "Updates a filter.",
  },
  perform: async (context, { connection, id, name, conditions }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/filters/${id}`, { name, conditions });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: filterIdInput,
    conditions: input({
      label: "Conditions",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The conditions of the filter as a JSON object",
    }),
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the filter",
    }),
  },
});
