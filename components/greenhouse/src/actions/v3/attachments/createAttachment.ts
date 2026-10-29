import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { createAttachmentV3ExamplePayload } from "../../../examplePayloads/v3/attachments";
import { createAttachmentV3Inputs } from "../../../inputs/v3/attachments";
import { generatePayload } from "../../../util";

export const createAttachmentV3 = action({
  display: {
    label: "Create Attachment",
    description: "Uploads or links an attachment to an application.",
  },
  inputs: createAttachmentV3Inputs,
  perform: async (
    context,
    {
      connection,
      applicationId,
      filename,
      attachmentType,
      fileContent,
      fileUrl,
      visibility,
    },
  ) => {
    if (Boolean(fileContent) === Boolean(fileUrl)) {
      throw new Error(
        "Provide either File Content (base64) or File URL, not both and not neither.",
      );
    }

    const client = createV3Client(connection, context.debug.enabled);

    const body = generatePayload({
      application_id: applicationId,
      filename,
      type: attachmentType,
      content: fileContent,
      url: fileUrl,
      visibility,
    });

    const { data } = await client.post("/attachments", body);
    return { data };
  },
  examplePayload: createAttachmentV3ExamplePayload,
});
