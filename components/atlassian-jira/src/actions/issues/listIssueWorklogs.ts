import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueWorklogsExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";

export const listIssueWorklogs = action({
  display: {
    label: "List Issue Worklogs",
    description: "Return a list of worklogs for an issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/issue/${params.issueId}/worklog`);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
  },
  examplePayload: listIssueWorklogsExamplePayload,
});
