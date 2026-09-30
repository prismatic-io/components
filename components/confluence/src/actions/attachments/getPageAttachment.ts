import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPageAttachmentInputs } from "../../inputs";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { listAttachmentsOutputSchema } from "../../outputSchemas";
export const getPageAttachment = action({
  display: {
    label: "Get Attachments for Page",
    description: "Returns the attachments of a specific page.",
  },
  inputs: getPageAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAttachmentsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, pageId, pagination, queryParameters },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/pages/${pageId}/attachments`, {
      params: {
        cursor: pagination.cursor,
        limit: pagination.limit,
        ...queryParameters,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listAttachmentsExamplePayload,
  examplePayload: listAttachmentsExamplePayload,
});
