import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateAdResponse } from "../../examplePayloads";
import { updateAdInputs } from "../../inputs";
export const updateAd = action({
  display: {
    label: "Update Ad",
    description: "Update the information and metadata of a given ad or adset.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adId,
      optionalValues,
      adName,
      status,
      tracking,
      creativeId,
      fields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.post(
      `/${adId}`,
      {},
      {
        params: {
          ...optionalValues,
          name: adName,
          status,
          tracking_specs: tracking,
          creative: creativeId ? { creative_id: creativeId } : undefined,
          fields,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: updateAdInputs,
  examplePayload: updateAdResponse,
});
