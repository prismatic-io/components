import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import { adId, fields, myConnectionField, version } from "../inputs";
import { adCreativeDefaults } from "../util";

export const getAdCreative = action({
  display: {
    label: "Get Ad Creative",
    description: "Get the information and metadata of the given ad creative.",
  },
  perform: async (context, { version, connection, adCreativeId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.get(`/${adCreativeId}`, {
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
    adCreativeId: {
      ...adId,
      label: "Ad Creative",
      comments:
        "Provide a unique identifier of the Ad Creative. This value should be an ID.",
    },

    fields: {
      ...fields,
      default: adCreativeDefaults,
    },
    version,
  },
});
