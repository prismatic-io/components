import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { sortBy } from "lodash";
import { createV3Client } from "../client";
import {
  issueFieldsExamplePayload,
  selectIssueExamplePayload,
  selectIssueTypeExamplePayload,
  selectIssueTypeFromProjectExamplePayload,
  selectIssueTypesExamplePayload,
} from "../examplePayloads";
import {
  issueFieldsInputs,
  selectIssueInputs,
  selectIssueTypeFromProjectInputs,
  selectIssueTypeInputs,
  selectIssueTypesInputs,
} from "../inputs";
import { getIssueTypes } from "../util";

const selectIssueType = dataSource({
  display: {
    label: "Select Issue Type from Projects",
    description: "Select an issue type from the specified projects.",
  },
  inputs: selectIssueTypeInputs,
  perform: async (_context, params) => {
    const result = await getIssueTypes(
      params.connection,
      params.projectIds,
      params.returnIssueTypeName,
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectIssueTypeExamplePayload,
});

const selectIssueTypes = dataSource({
  display: {
    label: "Select Issue Types from Projects",
    description: "Select one or many issue types from the specified projects.",
  },
  inputs: selectIssueTypesInputs,
  perform: async (_context, params) => {
    const result = (
      await getIssueTypes(params.connection, params.projectIds)
    ).map((issueElement) => ({ object: issueElement }));

    return { result };
  },
  dataSourceType: "objectSelection",
  examplePayload: selectIssueTypesExamplePayload,
});

const issueFields = dataSource({
  display: {
    label: "Select Issue Field",
    description: "Select an issue field from the available Jira issue fields.",
  },
  inputs: issueFieldsInputs,
  perform: async (_context, params) => {
    const client = await createV3Client(params.connection);
    const { data } = await client.get("/field");

    const fields = !params.onlyCustomFields
      ? data
      : data.filter(({ custom }) => custom);
    const sortedFields = sortBy(fields, ({ name }) => name);

    const result = sortedFields.map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: issueFieldsExamplePayload,
});

const selectIssue = dataSource({
  display: {
    label: "Select Issue by Project",
    description: "Select an issue from the specified project.",
  },
  inputs: selectIssueInputs,
  perform: async (_context, params) => {
    const client = await createV3Client(params.jiraConnection, false);

    const requestParams: Record<string, unknown> = {
      jql: `project=${params.projectId}`,
      maxResults: 1000,
      fields: "id,key",
    };

    const { data }: { data: { issues: { id: number; key: string }[] } } =
      await client.get("/search/jql", {
        params: requestParams,
      });
    const result = data.issues.map<Element>((issue) => ({
      label: issue.key,
      key: util.types.toString(issue.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectIssueExamplePayload,
});

const selectIssueTypeFromProject = dataSource({
  display: {
    label: "Select Issue Type from Project",
    description: "Select an issue type from the specified project.",
  },
  inputs: selectIssueTypeFromProjectInputs,
  perform: async (_context, params) => {
    const result = await getIssueTypes(
      params.connection,
      [
        {
          projectId: params.projectId,
        },
      ],
      params.returnIssueTypeName,
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectIssueTypeFromProjectExamplePayload,
});

export default {
  selectIssueType,
  selectIssueTypes,
  selectIssueTypeFromProject,
  issueFields,
  selectIssue,
};
