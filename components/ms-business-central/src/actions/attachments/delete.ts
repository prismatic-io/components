import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { attachmentId } from "../../inputs/attachments/updateAttachmentInputs";
import { connectionInput } from "../../inputs/general";

export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Delete an attachment object in Business Central.",
  },
  perform: async (context, { attachmentId, companyId, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/attachments(${attachmentId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    attachmentId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
