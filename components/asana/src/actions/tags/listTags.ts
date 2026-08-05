import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listTagsExamplePayload } from "../../examplePayloads";
import { listTagsInputs } from "../../inputs";
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
        limit: params.pagination.limit,
        offset: params.pagination.offset,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listTagsInputs,
  examplePayload: listTagsExamplePayload,
});
