import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteContentPropertyForAttachmentInputs } from "../../inputs";
export const deleteContentPropertyForAttachment = action({
  display: {
    label: "Delete Content Property for an Attachment",
    description: "Deletes a content property for an attachment by its id.",
  },
  inputs: deleteContentPropertyForAttachmentInputs,
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, attachmentId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/attachments/${attachmentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => null,
  examplePayload: {
    data: null,
  },
});
