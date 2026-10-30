import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createV3Client } from "../../client";
import { addIssueAttachmentExamplePayload } from "../../examplePayloads";
import { addIssueAttachmentInputs } from "../../inputs";
import { addIssueAttachmentOutputSchema } from "../../outputSchemas";

export const addIssueAttachment = action({
  display: {
    label: "Add Issue Attachment",
    description: "Add a file attachment to an issue.",
  },
  inputs: addIssueAttachmentInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const formData = new FormData();
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await client.post(
      `/issue/${params.issueId}/attachments`,
      formData,
      {
        headers: {
          "X-Atlassian-Token": "no-check",
          ...formData.getHeaders(),
        },
      },
    );
    return { data };
  },
  examplePerform: async () => addIssueAttachmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addIssueAttachmentOutputSchema,
  }),
  examplePayload: addIssueAttachmentExamplePayload,
});
