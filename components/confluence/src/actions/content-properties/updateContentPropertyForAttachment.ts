import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { updateContentPropertyForAttachmentInputs } from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForAttachmentExamplePayload } from "../../examplePayloads";
export const updateContentPropertyForAttachment = action({
  display: {
    label: "Update Content Property for Attachment",
    description: "Update a content property for attachment by its id.",
  },
  inputs: updateContentPropertyForAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, attachmentId, bodyData, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/attachments/${attachmentId}/properties/${propertyId}`,
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
    data: updateContentPropertyForAttachmentExamplePayload,
  }),
  examplePayload: {
    data: updateContentPropertyForAttachmentExamplePayload,
  },
});
