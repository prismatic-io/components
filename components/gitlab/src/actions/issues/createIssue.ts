import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createIssueExamplePayload } from "../../examplePayloads";
import { createIssueInputs } from "../../inputs";
import { createIssueOutputSchema } from "../../outputSchemas";
export const createIssue = action({
  display: {
    label: "Create Issue",
    description: "Create an issue in a project.",
  },
  inputs: createIssueInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      title,
      labels,
      assigneeIds,
      milestoneId,
      additionalFields,
    },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(`/projects/${project}/issues`, {
      title,
      description: additionalFields?.description,
      labels,
      assignee_ids: assigneeIds,
      milestone_id: milestoneId,
      due_date: additionalFields?.dueDate,
      confidential: additionalFields?.confidential,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createIssueExamplePayload,
  examplePayload: createIssueExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createIssueOutputSchema,
  }),
});
