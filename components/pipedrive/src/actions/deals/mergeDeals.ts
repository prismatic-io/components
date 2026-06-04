import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";

export const mergeDeals = action({
  display: {
    label: "Merge Deals",
    description: "Merges two deals.",
  },
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/deals/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    mergeWithId: input({
      label: "Merge With ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the deal that the deal will be merged with",
    }),
  },
});
