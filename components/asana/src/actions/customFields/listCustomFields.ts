import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listCustomFieldsExamplePayload } from "../../examplePayloads";
import { listCustomFieldsInputs } from "../../inputs";
export const listCustomFields = action({
  display: {
    label: "List Custom Fields",
    description: "List all custom fields in a workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/workspaces/${params.workspaceId}/custom_fields`,
      {
        params: {
          offset: params.pagination.offset,
          limit: params.pagination.limit,
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: listCustomFieldsInputs,
  examplePayload: listCustomFieldsExamplePayload,
});
