import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, attachmentId, propertyId } from "../../inputs";
import { getContentPropertyExamplePayload } from "../../examplePayloads";

export const getContentPropertiesForAttachments = action({
  display: {
    label: "Get Content Property for Attachment",
    description:
      "Retrieves a specific Content Property by ID that is attached to a specified attachment.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    propertyId,
  },
  perform: async (context, { connectionInput, attachmentId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/attachments/${attachmentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getContentPropertyExamplePayload,
  },
});
