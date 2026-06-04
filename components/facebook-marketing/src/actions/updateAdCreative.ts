import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import {
  adId,
  after,
  before,
  body,
  fields,
  limit,
  myConnectionField,
  name,
  objectStoryId,
  optionalValues,
  urlTags,
  version,
} from "../inputs";
import { adCreativeDefaults } from "../util";

export const updateAdCreative = action({
  display: {
    label: "Update Ad Creative",
    description:
      "Update the information and metadata of the given ad creative.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adCreativeId,
      optionalValues,
      urlTags,
      objectStoryId,
      body,
      name,
      limit,
      before,
      after,
      fields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.post(
      `/${adCreativeId}`,
      {},
      {
        params: {
          ...optionalValues,
          url_tags: urlTags,
          object_story_id: objectStoryId,
          body,
          name,
          limit,
          before,
          after,
          fields,
        },
        data: { url_tags: urlTags },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adCreativeId: {
      ...adId,
      label: "Ad Creative Id",
      comments: "The ID of the ad creative to update.",
    },
    urlTags,
    objectStoryId,
    name,
    body,
    limit,
    before,
    after,
    fields: { ...fields, default: adCreativeDefaults },
    optionalValues,
    version,
  },
});
