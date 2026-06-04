import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adId, fields, myConnectionField, version } from "../inputs";
import { adSetDefaults } from "../util";

export const getAdSet = action({
  display: {
    label: "Get Ad Set",
    description: "Get the information and metadata of a given Ad Set.",
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
    adId: {
      ...adId,
      label: "Ad Set Id",
      comments: "The ID of the Ad Set to retrieve.",
    },
    fields: {
      ...fields,
      default: adSetDefaults,
    },
    version,
  },
});
