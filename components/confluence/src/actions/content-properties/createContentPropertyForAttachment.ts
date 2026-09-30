import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createContentPropertyForAttachmentInputs } from "../../inputs";
import { createContentPropertyExamplePayload as createContentPropertyForAttachmentExamplePayload } from "../../examplePayloads";
export const createContentPropertyForAttachment = action({
  display: {
    label: "Create Content Property for Attachment",
    description: "Creates a new content property for an attachment.",
  },
  inputs: createContentPropertyForAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createContentPropertyForAttachmentExamplePayload,
  }),
  examplePayload: {
    data: createContentPropertyForAttachmentExamplePayload,
  },
});
