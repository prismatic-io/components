import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAttachmentInputs } from "../../inputs";
import { getAttachmentExamplePayload } from "../../examplePayloads";
import { attachmentSchema } from "../../outputSchemas";
export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Returns a specific attachment.",
  },
  inputs: getAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attachmentSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connectionInput, attachmentId, queryParameters },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/attachments/${attachmentId}`, {
      params: queryParameters,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getAttachmentExamplePayload,
  },
});
