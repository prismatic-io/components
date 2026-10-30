import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { updateIssueExamplePayload } from "../../examplePayloads";
import { updateIssueInputs } from "../../inputs";
import { getIssueType, toIdRef, validateDescription } from "../../util";

export const updateIssue = action({
  display: {
    label: "Update Issue",
    description: "Update an existing issue within a given project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );

    const issuetype = getIssueType(params.issueType, params.issueTypeId, false);
    const description = validateDescription(
      params.description,
      params.ADFdescription,
    );

    const config = {
      fields: {
        project: {
          id: params.projectId,
        },
        summary: params.summary,
        description,
        issuetype,
        assignee: toIdRef(params.assignee),
        reporter: toIdRef(params.reporter),
        fixVersions: params.additionalFields.fixVersions,
        priority: toIdRef(params.priority),
        labels: params.labels,
        duedate: params.additionalFields.dueDate,
        versions: params.additionalFields.versions,
        ...params.fieldValues,
        ...params.dynamicValues,
      },
    };
    const { data } = await client.put(`/issue/${params.issueId}`, config);
    return { data };
  },
  examplePerform: async () => updateIssueExamplePayload,
  inputs: updateIssueInputs,
  examplePayload: updateIssueExamplePayload,
});
