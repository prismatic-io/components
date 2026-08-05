import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getAttachmentExamplePayload } from "../../examplePayloads";
import { getAttachmentInputs } from "../../inputs";
export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Get the information and metadata of an attachment.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/attachments/${params.attachmentId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getAttachmentInputs,
  examplePayload: getAttachmentExamplePayload,
});
