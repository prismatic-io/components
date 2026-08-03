import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateAdCreativeResponse } from "../../examplePayloads";
import { updateAdCreativeInputs } from "../../inputs";
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
      pagination,
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
          limit: pagination.limit,
          before: pagination.before,
          after: pagination.after,
          fields,
        },
        data: { url_tags: urlTags },
      },
    );
    return {
      data,
    };
  },
  inputs: updateAdCreativeInputs,
  examplePayload: updateAdCreativeResponse,
});
