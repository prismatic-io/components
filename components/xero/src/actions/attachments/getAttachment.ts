import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getAttachmentInputs } from "../../inputs";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Retrieve an attachment by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data, headers } = await client.get(
      `/${params.objectType}/${params.objectId}/Attachments/${params.fileName}`,
      { responseType: "arraybuffer" },
    );
    return { data, contentType: headers["content-type"]?.toString() };
  },
  inputs: getAttachmentInputs,
});
