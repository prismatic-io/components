import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { listAttachmentsInputs } from "../../inputs";
export const listAttachments = action({
  display: {
    label: "List Task Attachments",
    description: "List all attachments in a given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tasks/${params.taskId}/attachments`, {
      params: {
        offset: params.pagination.offset,
        limit: params.pagination.limit,
      },
    });
    return { data };
  },
  inputs: listAttachmentsInputs,
  examplePayload: listAttachmentsExamplePayload,
});
