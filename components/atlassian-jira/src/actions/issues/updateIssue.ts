import { action, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { updateIssueExamplePayload } from "../../examplePayloads";
import {
  ADFdescription,
  assignee,
  connectionInput,
  description,
  dueDate,
  dynamicValues,
  fieldValues,
  fixVersions,
  issueId,
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

export const updateIssue = action({
  display: {
    label: "Update Issue",
    description: "Update an existing issue within a given project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);

    const issuetype = getIssueType(params.issueType, params.issueTypeId, false);
    const description = validateDescription(params.description, params.ADFdescription);

    const config = {
      fields: {
        project: {
          id: params.projectId,
        },
        summary: params.summary || undefined,
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
    const { data } = await client.put(`/issue/${params.issueId}`, config);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
    projectId,
    summary: { ...summary, required: false },
    description,
    ADFdescription,
    issueType,
    issueTypeId,
    assignee: { ...assignee, required: false },
    reporter: { ...reporter, required: false },
    fixVersions,
    priority,
    labels,
    dueDate,
    versions,
    dynamicValues,
    fieldValues,
  },
  examplePayload: updateIssueExamplePayload,
});
