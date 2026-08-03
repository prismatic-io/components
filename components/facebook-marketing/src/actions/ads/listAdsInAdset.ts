import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdsInAdsetResponse } from "../../examplePayloads";
import { listAdsInAdsetInputs } from "../../inputs";
export const listAdsInAdset = action({
  display: {
    label: "List Ads In Adset",
    description: "List all ads in a given adset.",
  },
  perform: async (context, { version, connection, adId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adId}/ads`, {
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: listAdsInAdsetInputs,
  examplePayload: listAdsInAdsetResponse,
});
