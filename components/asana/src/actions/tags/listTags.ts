import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import {
  limit,
  offset,
  connectionInput,
  workspaceId,
  optFields,
} from "../../inputs";
import { TAG_OPT_FIELDS } from "../../util";
export const listTags = action({
  display: {
    label: "List Tags",
    description: "List all tags accessible to the authenticated user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`workspaces/${params.workspaceId}/tags`, {
      params: {
        limit: params.limit,
        offset: params.offset,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: {
    asanaConnection: connectionInput,
    workspaceId,
    limit,
    offset,
    optFields: { ...optFields, default: TAG_OPT_FIELDS },
  },
  examplePayload: {
    data: {
      data: [
        {
          gid: "1202453507919841",
          color: "light-green",
          created_at: "2022-06-15T17:03:26.911Z",
          followers: [],
          name: "My example tag",
          resource_type: "tag",
          workspace: { gid: "1126509132283071", resource_type: "workspace" },
        },
      ],
    },
  },
});
