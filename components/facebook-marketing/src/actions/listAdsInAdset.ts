import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adId, fields, myConnectionField, version } from "../inputs";
import { adDefaults } from "../util";

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
  inputs: {
    connection: myConnectionField,
    adId: {
      ...adId,
      label: "Ad Set Id",
      comments: "The ID of the adset to list ads for.",
    },
    fields: {
      ...fields,
      default: adDefaults,
    },
    version,
  },
});
