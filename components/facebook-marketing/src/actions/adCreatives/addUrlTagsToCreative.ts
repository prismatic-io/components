import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addUrlTagsToCreativeResponse } from "../../examplePayloads";
import { addUrlTagsToCreativeInputs } from "../../inputs";
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
      pagination,
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
          limit: pagination.limit,
          before: pagination.before,
          after: pagination.after,
          fields,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: addUrlTagsToCreativeInputs,
  examplePayload: addUrlTagsToCreativeResponse,
});
