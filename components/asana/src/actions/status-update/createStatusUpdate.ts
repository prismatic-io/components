import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createStatusUpdateExamplePayload } from "../../examplePayloads";
import { createStatusUpdateInputs } from "../../inputs";
export const createStatusUpdate = action({
  display: {
    label: "Create Status Update",
    description: "Create a status update on a project, portfolio, or goal.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/status_updates`,
      {
        data: {
          parent: params.parent,
          text: params.statusUpdateText,
          title: params.statusUpdateTitle,
          status_type: params.statusType,
        },
      },
      {
        params: {
          limit: params.pagination.limit,
          offset: params.pagination.offset,
        },
      },
    );
    return { data };
  },
  inputs: createStatusUpdateInputs,
  examplePayload: createStatusUpdateExamplePayload,
});
