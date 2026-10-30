import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { downloadAttachmentExamplePayload } from "../../examplePayloads";
import { downloadAttachmentInputs } from "../../inputs";
import type { AttachmentResponse } from "../../types";
import {
  downloadArrayOfAttachments,
  downloadAttachmentsFromIssue,
  getIssueById,
} from "../../util";

export const downloadAttachment = action({
  display: {
    label: "Download Issue Attachments",
    description: "Download the attachment data connected to an issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, { issueId, jiraConnection, attachmentIds }) => {
    const client = await createV3Client(jiraConnection, context.debug.enabled);
    const baseUrl = client.defaults.baseURL;
    let data: AttachmentResponse[];
    if (attachmentIds?.length > 0) {
      data = await downloadArrayOfAttachments(
        jiraConnection,
        baseUrl,
        attachmentIds,
      );
    } else if (issueId) {
      const issue = await getIssueById(client, issueId);
      data = await downloadAttachmentsFromIssue(issue, jiraConnection, baseUrl);
    } else {
      throw new Error(
        "You must provide either an Issue ID or a list of Attachment IDs.",
      );
    }
    return { data };
  },
  examplePerform: async () => downloadAttachmentExamplePayload,
  inputs: downloadAttachmentInputs,
  examplePayload: downloadAttachmentExamplePayload,
});
