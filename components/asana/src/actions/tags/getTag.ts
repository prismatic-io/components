import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { connectionInput, tagId, optFields } from "../../inputs";
import { TAG_OPT_FIELDS } from "../../util";
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
  inputs: {
    asanaConnection: connectionInput,
    tagId,
    optFields: { ...optFields, default: TAG_OPT_FIELDS },
  },
  examplePayload: {
    data: {
      data: {
        gid: "1202461566347259",
        color: "light-green",
        created_at: "2022-06-16T21:44:38.673Z",
        followers: [],
        name: "My Example Tag",
        notes: "My Notes",
        resource_type: "tag",
        workspace: { gid: "1126509132283071", resource_type: "workspace" },
      },
    },
  },
});
