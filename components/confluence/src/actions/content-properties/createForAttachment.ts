import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, attachmentId, bodyData } from "../../inputs";
import { getContentPropertyExamplePayload as createContentPropertyForAttachmentExamplePayload } from "../../examplePayloads";

export const createContentPropertyForAttachment = action({
  display: {
    label: "Create Content Property for Attachment",
    description: "Creates a new content property for an attachment.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    bodyData,
  },
  perform: async (context, { connectionInput, attachmentId, bodyData }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/attachments/${attachmentId}/properties`,
      bodyData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createContentPropertyForAttachmentExamplePayload,
  },
});
