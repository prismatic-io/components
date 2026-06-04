import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, organizationIdInput } from "../../inputs";

export const mergeOrganizations = action({
  display: {
    label: "Merge Organizations",
    description: "Merges two organizations.",
  },
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/organizations/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    mergeWithId: input({
      label: "Merge With ID",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: "The ID of the organization that the organization will be merged with",
    }),
  },
});
