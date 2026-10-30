import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { deleteIssueExamplePayload } from "../../examplePayloads";
import { deleteIssueInputs } from "../../inputs";

export const deleteIssue = action({
  display: {
    label: "Delete Issue",
    description: "Delete an issue by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/issue/${params.issueId}`);
    return { data };
  },
  examplePerform: async () => deleteIssueExamplePayload,
  inputs: deleteIssueInputs,
  examplePayload: deleteIssueExamplePayload,
});
