import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getIssueExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";
import { getIssueById } from "../../util";

export const getIssue = action({
  display: {
    label: "Get Issue",
    description: "Get the information and metadata of an issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const data = await getIssueById(client, params.issueId);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
  },
  examplePayload: {
    data: getIssueExamplePayload.data,
  },
});
