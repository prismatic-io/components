import { action, input, util } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createV3Client } from "../../connections/auth";
import { addIssueAttachmentExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";

export const addIssueAttachment = action({
  display: {
    label: "Add Issue Attachment",
    description: "Add a file attachment to an issue.",
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
    file: input({
      label: "File",
      type: "data",
      required: true,
      comments: "The file to upload - either string contents or a binary file",
      clean: util.types.toBufferDataPayload,
    }),
    fileName: input({
      label: "File Name",
      type: "string",
      required: true,
      comments: "The name of the file to upload",
      clean: util.types.toString,
    }),
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const formData = new FormData();
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await client.post(`/issue/${params.issueId}/attachments`, formData, {
      headers: {
        "X-Atlassian-Token": "no-check", 
        ...formData.getHeaders(),
      },
    });
    return { data };
  },
  examplePayload: addIssueAttachmentExamplePayload,
});
