import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { getMediaInputs } from "../inputs/getMediaInputs";
import { getMediaExamplePayload } from "../examplePayloads";

export const getMedia = action({
  display: {
    label: "Get Media",
    description: "Get media from WhatsApp.",
  },
  perform: async (context, { connection, mediaId, phoneNumberId }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(`/${mediaId}`, {
      params: { phone_number_id: phoneNumberId },
    });
    return {
      data,
    };
  },
  inputs: getMediaInputs,
  examplePayload: getMediaExamplePayload,
});
