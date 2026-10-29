import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectAttachmentInputs } from "../inputs";

export const selectAttachment = dataSource({
  display: {
    label: "Select Attachment",
    description: "Select an attachment from a specific sheet.",
  },
  dataSourceType: "picklist",
  inputs: selectAttachmentInputs,
  perform: async (_context, { connection, sheetId }) => {
    const client = createClient(connection, false);
    const {
      data: { data: attachments },
    } = await client.get(`/sheets/${sheetId}/attachments`);

    if (!attachments || !Array.isArray(attachments)) {
      return { result: [] };
    }

    const result: Element[] = attachments.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
