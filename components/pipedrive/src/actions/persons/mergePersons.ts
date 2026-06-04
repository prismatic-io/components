import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";

export const mergePersons = action({
  display: {
    label: "Merge Persons",
    description: "Merges two persons.",
  },
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/persons/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    mergeWithId: input({
      label: "Merge With ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the person that will not be overwritten",
    }),
  },
});
