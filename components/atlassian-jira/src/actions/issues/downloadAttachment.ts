import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { downloadAttachmentExamplePayload } from "../../examplePayloads";
import { attachmentIds, connectionInput, issueId } from "../../inputs";
import type { AttachmentResponse } from "../../types";
import { downloadArrayOfAttachments, downloadAttachmentsFromIssue, getIssueById } from "../../util";

export const downloadAttachment = action({
  display: {
    label: "Download Issue Attachments",
    description: "Download the attachment data connected to an issue.",
  },
  perform: async (context, { issueId, jiraConnection, attachmentIds }) => {
    const client = await createV3Client(jiraConnection, context.debug.enabled);
    const baseUrl = client.defaults.baseURL;
    let data: AttachmentResponse[];
    if (attachmentIds?.length > 0) {
      data = await downloadArrayOfAttachments(jiraConnection, baseUrl, attachmentIds);
    } else if (issueId) {
      const issue = await getIssueById(client, issueId);
      data = await downloadAttachmentsFromIssue(issue, jiraConnection, baseUrl);
    } else {
      throw new Error("You must provide either an Issue ID or a list of Attachment IDs.");
    }
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId: {
      ...issueId,
      comments: "Providing an Issue ID will return all attachments of an Issue.",
      required: false,
    },
    attachmentIds,
  },
  examplePayload: downloadAttachmentExamplePayload,
});
