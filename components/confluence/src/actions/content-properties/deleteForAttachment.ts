import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, attachmentId, propertyId } from "../../inputs";

export const deleteContentPropertyForAttachment = action({
  display: {
    label: "Delete Content Property for an Attachment",
    description: "Deletes a content property for an attachment by its id.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    propertyId,
  },
  perform: async (context, { connectionInput, attachmentId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/attachments/${attachmentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: null,
  },
});
