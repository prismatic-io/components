import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { REFERENCE_ATTACHMENT_ODATA_TYPE } from "../constants";
import { selectMessageAttachmentExamplePayload } from "../examplePayloads";
import { selectMessageAttachmentInputs } from "../inputs";
import { listAttachments } from "../util/attachments";

export const selectMessageAttachment = dataSource({
  display: {
    label: "Select Message Attachment",
    description: "Select an attachment from a mail message.",
  },
  inputs: selectMessageAttachmentInputs,
  perform: async (_context, { connection, messageId }) => {
    const client = createClient(connection, false);
    const { value } = await listAttachments(client, connection, `/me/messages/${messageId}`);

    const result = value
      .filter((attachment) => attachment["@odata.type"] !== REFERENCE_ATTACHMENT_ODATA_TYPE)
      .map<Element>((attachment) => ({
        label: util.types.toString(attachment.name),
        key: util.types.toString(attachment.id),
      }));
    return { result };
  },
  examplePayload: selectMessageAttachmentExamplePayload,
  dataSourceType: "picklist",
});
