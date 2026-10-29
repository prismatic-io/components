import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { updateMergeRequestExamplePayload } from "../../examplePayloads";
import { updateMergeRequestInputs } from "../../inputs";
import { updateMergeRequestOutputSchema } from "../../outputSchemas";
import { requireAnyUpdate } from "../../utils";

export const updateMergeRequest = action({
  display: {
    label: "Update Merge Request",
    description:
      "Update a merge request's fields, or close or reopen it. Empty inputs leave the current values unchanged.",
  },
  inputs: updateMergeRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      project,
      mergeRequestIid,
      labels,
      assigneeIds,
      targetBranch,
      additionalFields,
    },
  ) => {
    const body = requireAnyUpdate(
      {
        title: additionalFields?.title,
        description: additionalFields?.description,
        labels,
        assignee_ids: assigneeIds,
        target_branch: targetBranch,
        state_event: additionalFields?.stateEvent,
      },
      "merge request",
    );
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.put(
      `/projects/${project}/merge_requests/${mergeRequestIid}`,
      body,
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    updateMergeRequestExamplePayload,
  examplePayload: updateMergeRequestExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateMergeRequestOutputSchema,
  }),
});
