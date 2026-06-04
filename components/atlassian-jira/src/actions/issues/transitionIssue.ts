import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { transitionIssueExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId, transitionId } from "../../inputs";

export const transitionIssue = action({
  display: {
    label: "Transition Issue",
    description: "Transition an existing issue by ID.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.post(`/issue/${params.issueId}/transitions`, {
      transition: {
        id: params.transitionId,
      },
    });

    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
    transitionId,
  },
  examplePayload: transitionIssueExamplePayload,
});
