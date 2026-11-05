import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { attachmentContent, attachmentId } from "../../inputs/attachments/updateAttachmentInputs";
import { connectionInput } from "../../inputs/general";

export const updateAttachment = action({
  display: {
    label: "Update Attachment",
    description: "Update the attachment content in Business Central.",
  },
  perform: async (context, { attachmentId, companyId, connection, attachmentContent }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    await client.patch(
      `/companies(${companyId}/attachments(${attachmentId})/attachmentContent`,
      attachmentContent.data,
      {
        headers: {
          "If-Match": "*",
        },
      },
    );

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    attachmentId,
    attachmentContent,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
