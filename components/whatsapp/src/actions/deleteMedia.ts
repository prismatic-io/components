import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { deleteMediaInputs } from "../inputs/deleteMediaInputs";
import { deleteMediaExamplePayload } from "../examplePayloads";

export const deleteMedia = action({
  display: {
    label: "Delete Media",
    description: "Delete a media file from a phone number.",
  },
  perform: async (context, { connection, mediaId }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/${mediaId}`);
    return {
      data,
    };
  },
  inputs: deleteMediaInputs,
  examplePayload: deleteMediaExamplePayload,
});
