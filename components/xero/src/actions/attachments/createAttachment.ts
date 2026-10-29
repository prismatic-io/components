import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { createAttachmentInputs } from "../../inputs";

export const createAttachment = action({
  display: {
    label: "Create Attachment",
    description:
      "Add an attachment to an existing object. Existing attachments with that file name will be overridden.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/${params.objectType}/${params.objectId}/Attachments/${params.fileName}`,
      params.file.data,
      { headers: { "Content-Type": params.contentType } },
    );
    return { data };
  },
  inputs: createAttachmentInputs,
});
