import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteAttachmentExamplePayload } from "../../examplePayloads";
import { deleteAttachmentInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Delete an existing attachment.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/attachments/${params.attachmentId}`);
    return { data };
  },
  inputs: deleteAttachmentInputs,
  examplePayload: deleteAttachmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
