import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import {
  adId,
  adName,
  creativeId,
  fields,
  myConnectionField,
  optionalValues,
  status,
  tracking,
  version,
} from "../inputs";
import { adDefaults } from "../util";

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
  inputs: {
    connection: myConnectionField,
    adId,
    adName,
    status,
    creativeId,
    tracking,
    optionalValues,
    fields: {
      ...fields,
      default: adDefaults,
    },
    version,
  },
});
