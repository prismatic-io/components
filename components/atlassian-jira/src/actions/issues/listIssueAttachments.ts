import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueAttachmentsExamplePayload } from "../../examplePayloads";
import { listIssueAttachmentsInputs } from "../../inputs";
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
  inputs: listIssueAttachmentsInputs,
  examplePayload: listIssueAttachmentsExamplePayload,
});
