import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAdPreviewResponse } from "../../examplePayloads";
import { getAdPreviewInputs } from "../../inputs";
export const getAdPreview = action({
  display: {
    label: "List Ad Previews",
    description: "Get a list of all previews of the given ad.",
  },
  perform: async (context, { version, connection, adId, adFormat }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adId}/previews`, {
      params: { ad_format: adFormat },
    });
    return {
      data,
    };
  },
  inputs: getAdPreviewInputs,
  examplePayload: getAdPreviewResponse,
});
