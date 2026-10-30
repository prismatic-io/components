import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueTransitionsExamplePayload } from "../../examplePayloads";
import { listIssueTransitionsInputs } from "../../inputs";
import { listIssueTransitionsOutputSchema } from "../../outputSchemas";

export const listIssueTransitions = action({
  display: {
    label: "List Issue Transitions",
    description: "Return a list of available transitions for an issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/issue/${params.issueId}/transitions`);

    return { data };
  },
  examplePerform: async () => listIssueTransitionsExamplePayload,
  inputs: listIssueTransitionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueTransitionsOutputSchema,
  }),
  examplePayload: listIssueTransitionsExamplePayload,
});
