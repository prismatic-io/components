import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";

import {
  adAccountId,
  after,
  before,
  fields,
  limit,
  myConnectionField,
  objectStoryId,
  optionalValues,
  urlTags,
  version,
} from "../inputs";
import { adCreativeDefaults } from "../util";

export const addUrlTagsToCreative = action({
  display: {
    label: "Add URL Tags To Ad Creative",
    description:
      "Update an existing Ad Creative to include a new set of URL Tags.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adAccountId,
      optionalValues,
      urlTags,
      objectStoryId,
      limit,
      before,
      after,
      fields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.post(
      `/${adAccountId}/adCreatives`,
      {},
      {
        params: {
          ...optionalValues,
          url_tags: urlTags,
          object_story_id: objectStoryId,

          limit,
          before,
          after,
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
    adAccountId,
    urlTags: { ...urlTags, required: true },
    objectStoryId: { ...objectStoryId, required: true },
    limit,
    before,
    after,
    fields: { ...fields, default: adCreativeDefaults },
    optionalValues,
    version,
  },
});
