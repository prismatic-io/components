import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericMediaResponse } from "../../examplePayloads";
import { connectionInput, mediaId, recipientId } from "../../inputs";

export const getIDVSessionMedia = action({
  display: {
    label: "Get IDV session media",
    description:
      "This action will allow you to obtain the individual media generated in the identity verification session submitted in signing e.g the image of a document.",
  },
  inputs: {
    connection: connectionInput,
    recipientId,
    mediaId,
  },
  perform: async (context, { connection, mediaId, recipientId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/idv/recipients/${recipientId}/sessions/signed/media/${mediaId}`,
      { responseType: "arraybuffer" },
    );

    return { data };
  },
  examplePayload: {
    data: genericMediaResponse,
  },
});
