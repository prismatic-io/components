import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adId, myConnectionField, version } from "../inputs";

export const deleteAd = action({
  display: {
    label: "Delete Ad",
    description: "Delete the information and metadata of a given ad.",
  },
  perform: async (context, { version, connection, adId }) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.delete(`/${adId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adId: { ...adId, comments: "Ad ID to delete." },
    version,
  },
});
