import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { listAttachmentsInputs } from "../../inputs";
import { listAttachmentsOutputSchema } from "../../outputSchemas";
export const listAttachments = action({
  display: {
    label: "List Task Attachments",
    description: "List all attachments in a given task.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAttachmentsOutputSchema,
  }),
});
