import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { updateIssueExamplePayload } from "../../examplePayloads";
import { updateIssueInputs } from "../../inputs";
import { updateIssueOutputSchema } from "../../outputSchemas";
import { requireAnyUpdate } from "../../utils";
export const updateIssue = action({
  display: {
    label: "Update Issue",
    description:
      "Update an issue's fields, or close or reopen it. Empty inputs leave the current values unchanged.",
  },
  inputs: updateIssueInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      issueIid,
      labels,
      assigneeIds,
      milestoneId,
      additionalFields,
    },
  ) => {
    const body = requireAnyUpdate(
      {
        title: additionalFields?.title,
        description: additionalFields?.description,
        labels,
        assignee_ids: assigneeIds,
        milestone_id: milestoneId,
        due_date: additionalFields?.dueDate,
        state_event: additionalFields?.stateEvent,
        confidential: additionalFields?.confidential,
      },
      "issue",
    );
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.put(
      `/projects/${project}/issues/${issueIid}`,
      body,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateIssueExamplePayload,
  examplePayload: updateIssueExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateIssueOutputSchema,
  }),
});
