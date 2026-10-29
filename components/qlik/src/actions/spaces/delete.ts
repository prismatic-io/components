import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSpaceExamplePayload } from "../../examplePayloads";
import { connectionInput, spaceId } from "../../inputs";

export const deleteSpace = action({
  display: {
    label: "Delete Space",
    description: "Deletes a space by ID.",
  },
  examplePayload: deleteSpaceExamplePayload,
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/spaces/${spaceId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    spaceId: {
      ...spaceId,
      comments: "The ID of the space you would like to delete.",
    },
  },
});
