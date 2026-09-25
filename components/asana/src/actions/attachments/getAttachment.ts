import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getAttachmentExamplePayload } from "../../examplePayloads";
import { getAttachmentInputs } from "../../inputs";
import { attachmentResponseSchema } from "../../outputSchemas";
export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Get the information and metadata of an attachment.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/attachments/${params.attachmentId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getAttachmentInputs,
  examplePayload: getAttachmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attachmentResponseSchema,
  }),
});
