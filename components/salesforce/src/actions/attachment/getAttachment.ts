import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { getAttachmentInputs } from "../../inputs";
import { getAttachmentExamplePayload } from "../../examplePayloads";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Get a file attachment from an account, opportunity, or contact.",
  },
  inputs: getAttachmentInputs,
  perform: async (context, { connection, version, fileId }) => {
    const httpClient = await createSalesforceHttpClient(version, connection, context.debug.enabled);

    const { data, headers } = await httpClient.get(`/sobjects/Attachment/${fileId}/Body`, {
      responseType: "arraybuffer",
    });

    const contentType = headers["content-type"];

    return { data, contentType };
  },
  examplePayload: getAttachmentExamplePayload,
});
