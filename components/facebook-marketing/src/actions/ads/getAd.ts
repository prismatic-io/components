import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAdResponse } from "../../examplePayloads";
import { getAdInputs } from "../../inputs";
export const getAd = action({
  display: {
    label: "Get Ad",
    description: "Get the information and metadata of a given ad.",
  },
  perform: async (context, { version, connection, adId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adId}`, {
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: getAdInputs,
  examplePayload: getAdResponse,
});
