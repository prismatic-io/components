import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { REFERENCE_ATTACHMENT_ODATA_TYPE } from "../constants";
import { selectEventAttachmentExamplePayload } from "../examplePayloads";
import { selectEventAttachmentInputs } from "../inputs";
import { listAttachments } from "../util/attachments";

export const selectEventAttachment = dataSource({
  display: {
    label: "Select Event Attachment",
    description: "Select an attachment from a calendar event.",
  },
  inputs: selectEventAttachmentInputs,
  perform: async (_context, { connection, eventId }) => {
    const client = createClient(connection, false);
    const { value } = await listAttachments(client, connection, `/me/events/${eventId}`);

    const result = value
      .filter((attachment) => attachment["@odata.type"] !== REFERENCE_ATTACHMENT_ODATA_TYPE)
      .map<Element>((attachment) => ({
        label: util.types.toString(attachment.name),
        key: util.types.toString(attachment.id),
      }));
    return { result };
  },
  examplePayload: selectEventAttachmentExamplePayload,
  dataSourceType: "picklist",
});
