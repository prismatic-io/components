import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, attachmentId, queryParameters } from "../../inputs";
import { getAttachmentExamplePayload } from "../../examplePayloads";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Returns a specific attachment.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    queryParameters,
  },
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
