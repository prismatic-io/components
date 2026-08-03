import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAdResponse } from "../../examplePayloads";
import { deleteAdInputs } from "../../inputs";
export const deleteAd = action({
  display: {
    label: "Delete Ad",
    description: "Delete an ad by its ID.",
  },
  perform: async (context, { version, connection, adId }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.delete(`/${adId}`);
    return {
      data,
    };
  },
  inputs: deleteAdInputs,
  examplePayload: deleteAdResponse,
});
