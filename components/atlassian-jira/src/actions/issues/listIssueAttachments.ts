import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { connectionInput, issueId } from "../../inputs";
import { getAttachmentsFromIssue, getIssueById } from "../../util";

export const listIssueAttachments = action({
  display: {
    label: "List Issue Attachments",
    description: "Return a list of attachments for a given issue.",
  },
  perform: async (context, { issueId, jiraConnection }) => {
    const client = await createV3Client(jiraConnection, context.debug.enabled);
    const issue = await getIssueById(client, issueId);
    const data = getAttachmentsFromIssue(issue);
    return { data };
  },
  inputs: {
    issueId,
    jiraConnection: connectionInput,
  },
});
