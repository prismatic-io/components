import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { createIssueExamplePayload } from "../../examplePayloads";
import { createIssueInputs } from "../../inputs";
import { createIssueOutputSchema } from "../../outputSchemas";
import { getIssueType, toIdRef, validateDescription } from "../../util";

export const createIssue = action({
  display: {
    label: "Create Issue",
    description: "Create an issue within a given project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );

    const description = validateDescription(
      params.description,
      params.ADFdescription,
    );

    const issuetype = getIssueType(params.issueType, params.issueTypeId);

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

    const { data } = await client.post("/issue", config);
    return { data };
  },
  examplePerform: async () => createIssueExamplePayload,
  inputs: createIssueInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createIssueOutputSchema,
  }),
  examplePayload: createIssueExamplePayload,
});
