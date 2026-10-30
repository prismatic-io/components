import type { Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { downloadFile } from "../client";
import type { Attachment, AttachmentResponse, Issue } from "../types";

export const downloadIssueAttachment = async (
  client: HttpClient,
  jiraConnection: Connection,
  issueId: string,
) => {
  const { data: issueData } = await client.get(`/issue/${issueId}`);

  const attachmentData = issueData.fields?.attachment[0];
  if (!attachmentData) {
    throw new Error("Unable to find any attachments on the given issue.");
  }

  const { content: contentUrl, mimeType: contentType } = attachmentData;
  if (!contentUrl && !contentType) {
    throw new Error("Unable to find download link on the given attachment.");
  }

  const data = await downloadFile(jiraConnection, contentUrl);

  return {
    data,
    contentType,
  };
};

export const downloadArrayOfAttachments = async (
  jiraConnection: Connection,
  baseUrl: string,
  attachmentIds: Attachment[],
): Promise<AttachmentResponse[]> => {
  const data = await Promise.all(
    attachmentIds.map(async ({ id, mimeType }) => ({
      data: await downloadFile(
        jiraConnection,
        `${baseUrl}/attachment/content/${id}`,
      ),
      contentType: mimeType,
    })),
  );
  return data;
};

export const getAttachmentsFromIssue = (data: Issue) => {
  const attachments =
    data.fields.attachment.map(({ id, mimeType }) => ({
      id,
      mimeType,
    })) || [];
  return attachments as Attachment[];
};

export const downloadAttachmentsFromIssue = async (
  data: Issue,
  jiraConnection: Connection,
  baseUrl: string,
) => {
  const attachments = getAttachmentsFromIssue(data);
  return await downloadArrayOfAttachments(jiraConnection, baseUrl, attachments);
};
