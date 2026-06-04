import { action, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { createIssueExamplePayload } from "../../examplePayloads";
import {
  ADFdescription,
  assignee,
  connectionInput,
  description,
  dueDate,
  dynamicValues,
  fieldValues,
  fixVersions,
  issueType,
  issueTypeId,
  labels,
  priority,
  projectId,
  reporter,
  summary,
  versions,
} from "../../inputs";
import { getIssueType, validateDescription } from "../../util";

export const createIssue = action({
  display: {
    label: "Create Issue",
    description: "Create an issue within a given project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);

    const description = validateDescription(params.description, params.ADFdescription);

    const issuetype = getIssueType(params.issueType, params.issueTypeId);

    const config = {
      fields: {
        project: {
          id: params.projectId,
        },
        summary: util.types.toString(params.summary),
        description,
        issuetype,
        assignee: util.types.toString(params.assignee)
          ? {
              id: params.assignee,
            }
          : undefined,
        reporter: util.types.toString(params.reporter)
          ? {
              id: params.reporter,
            }
          : undefined,
        fixVersions: util.types.toString(params.fixVersions) || undefined,
        priority: util.types.toString(params.priority)
          ? {
              id: params.priority,
            }
          : undefined,
        labels: params.labels,
        duedate: params.dueDate ? util.types.toString(params.dueDate) : undefined,
        versions: util.types.toString(params.versions)
          ? JSON.parse(util.types.toString(params.versions))
          : undefined,
        ...params.fieldValues,
        ...params.dynamicValues,
      },
    };

    const { data } = await client.post("/issue", config);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId,
    summary,
    description,
    ADFdescription,
    issueType,
    issueTypeId,
    assignee,
    reporter,
    dueDate,
    priority,
    labels,
    versions,
    fixVersions,
    dynamicValues,
    fieldValues,
  },
  examplePayload: createIssueExamplePayload,
});
