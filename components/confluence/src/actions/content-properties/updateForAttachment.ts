import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  attachmentId,
  bodyData,
  propertyId,
} from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForAttachmentExamplePayload } from "../../examplePayloads";

export const updateContentPropertyForAttachment = action({
  display: {
    label: "Update Content Property for Attachment",
    description: "Update a content property for attachment by its id.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    propertyId,
    bodyData: {
      ...bodyData,
      default: JSON.stringify(
        {
          key: "<string>",
          value: "<string>",
          version: {
            number: 84,
            message: "<string>",
          },
        },
        null,
        2,
      ),
    },
  },
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
  examplePayload: {
    data: updateContentPropertyForAttachmentExamplePayload,
  },
});
