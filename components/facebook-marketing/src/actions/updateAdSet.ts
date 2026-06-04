import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  adId,
  adName,
  fields,
  myConnectionField,
  optionalValues,
  status,
  targeting,
  version,
} from "../inputs";
import { adSetDefaults } from "../util";

export const updateAdSet = action({
  display: {
    label: "Update Ad Set",
    description: "Update the information and metadata of a given Ad Set.",
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
      targeting,
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
          targeting,
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
    adId: {
      ...adId,
      label: "Ad Set Id",
      comments: "The ID of the Ad Set to update.",
    },
    adName: {
      ...adName,
      label: "Ad Set Name",
      comments: "Provide a name for the Ad Set.",
    },
    status: {
      ...status,
      label: "Ad Set Status",
      comments:
        "Provide a status for the Ad Set. During testing, it is recommended to set ad sets to a PAUSED status so as to not incur accidental spend.",
    },
    targeting,
    optionalValues,
    fields: { ...fields, default: adSetDefaults },
    version,
  },
});
