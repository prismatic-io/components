import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getTagExamplePayload } from "../../examplePayloads";
import { getTagInputs } from "../../inputs";
export const getTag = action({
  display: {
    label: "Get Tag",
    description: "Get the information and metadata of a tag.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tags/${params.tagId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getTagInputs,
  examplePayload: getTagExamplePayload,
});
