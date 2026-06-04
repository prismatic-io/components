import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { deleteIssueExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";

export const deleteIssue = action({
  display: {
    label: "Delete Issue",
    description: "Delete an issue by ID.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.delete(`/issue/${params.issueId}`);
    return { data };
  },
  inputs: { jiraConnection: connectionInput, issueId },
  examplePayload: deleteIssueExamplePayload,
});
