import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectAttachmentsInputs } from "../inputs";
import type { Attachment } from "../types";
import { ATTACHMENTS_URL, ATTACHMENTS_URL_REGEX } from "../constants";
import { paginateResults } from "../util";
export const listAttachments = dataSource({
  display: {
    label: "List Attachments",
    description: "A picklist of attachments in the Confluence instance.",
  },
  inputs: selectAttachmentsInputs,
  perform: async (_context, { connectionInput }) => {
    const client = await createClient(connectionInput, false);
    const attachments = await paginateResults<Attachment>(
      client,
      ATTACHMENTS_URL,
      ATTACHMENTS_URL_REGEX,
    );
    const result = attachments
      .map<Element>(({ title, id }) => ({
        label: title,
        key: id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "architecture-diagram.png", key: "att123456789" },
      { label: "meeting-notes.pdf", key: "att987654321" },
    ],
  },
});
