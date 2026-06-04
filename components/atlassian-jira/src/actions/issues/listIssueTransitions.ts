import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueTransitionsExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";

export const listIssueTransitions = action({
  display: {
    label: "List Issue Transitions",
    description: "Return a list of available transitions for an issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/issue/${params.issueId}/transitions`);

    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
  },
  examplePayload: listIssueTransitionsExamplePayload,
});
