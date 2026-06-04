import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import { adId, fields, myConnectionField, version } from "../inputs";
import { adDefaults } from "../util";

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
  inputs: {
    connection: myConnectionField,
    adId: { ...adId, comments: "Ad ID to get." },
    fields: {
      ...fields,
      default: adDefaults,
    },
    version,
  },
});
