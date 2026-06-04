import { type Connection, dataSource, type Element, input, util } from "@prismatic-io/spectral";
import { sortBy } from "lodash";
import { createV3Client } from "../connections/auth";
import {
  connectionInput,
  projectId,
  projectIds as projectIdsInput,
  returnIssueTypeName as returnIssueTypeNameInput,
} from "../inputs";

const getIssueTypes = async (
  connection: Connection,
  projectIds: { projectId: string; projectName?: string }[],
  returnIssueTypeName = false,
) => {
  const client = await createV3Client(connection);
  const promises = projectIds.map(async ({ projectId, projectName }) => {
    const { data } = await client.get<{ id: string; name: string }[]>("/issuetype/project", {
      params: { projectId },
    });
    return data.map((issueType) => ({
      ...issueType,
      projectName: projectName,
    }));
  });

  const allIssueTypes = (await Promise.all(promises))
    .flat()
    .sort((a, b) => (a.name < b.name ? -1 : 1));
  const result: Element[] = [];

  for (const issueType of allIssueTypes) {
    if (allIssueTypes.filter((i) => i.id === issueType.id).length > 1) {
      if (!result.filter((i) => i.key === issueType.id).length) {
        result.push({
          label: issueType.name,
          key: returnIssueTypeName ? issueType.name : issueType.id,
        });
      }
    } else {
      result.push({
        label:
          projectIds.length > 1 && issueType.projectName
            ? `${issueType.name} (${issueType.projectName})`
            : issueType.name,
        key: returnIssueTypeName ? issueType.name : issueType.id,
      });
    }
  }
  return result;
};

const selectIssueType = dataSource({
  display: {
    label: "Select Issue Type from Projects",
    description: "Select an issue type from the specified projects.",
  },
  inputs: {
    connection: connectionInput,
    projectIds: projectIdsInput,
    returnIssueTypeName: returnIssueTypeNameInput,
  },
  perform: async (_context, params) => {
    const result = await getIssueTypes(
      params.connection,
      params.projectIds,
      params.returnIssueTypeName,
    );
    return { result };
  },
  dataSourceType: "picklist",
});

const selectIssueTypes = dataSource({
  display: {
    label: "Select Issue Types from Projects",
    description: "Select one or many issue types from the specified projects.",
  },
  inputs: {
    connection: connectionInput,
    projectIds: projectIdsInput,
  },
  perform: async (_context, params) => {
    const result = (await getIssueTypes(params.connection, params.projectIds)).map(
      (issueElement) => ({ object: issueElement }),
    );

    return { result };
  },
  dataSourceType: "objectSelection",
});

const issueFields = dataSource({
  display: {
    label: "Select Issue Field",
    description: "Select an issue field from the available Jira issue fields.",
  },
  inputs: {
    connection: connectionInput,
    onlyCustomFields: input({
      label: "Only Custom Fields",
      type: "boolean",
      required: false,
      default: "false",
      clean: util.types.toBool,
    }),
  },
  perform: async (_context, params) => {
    const client = await createV3Client(params.connection);
    const { data } = await client.get("/field");

    const fields = !params.onlyCustomFields ? data : data.filter(({ custom }) => custom);
    const sortedFields = sortBy(fields, ({ name }) => name);

    const result = sortedFields.map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

const selectIssue = dataSource({
  display: {
    label: "Select Issue by Project",
    description: "Select an issue from the specified project.",
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId: {
      ...projectId,
      dataSource: undefined,
    },
  },
  perform: async (_context, params) => {
    const client = await createV3Client(params.jiraConnection, false);

    const requestParams: Record<string, unknown> = {
      jql: `project=${params.projectId}`,
      maxResults: 1000,
      fields: "id,key",
    };

    const { data }: { data: { issues: { id: number; key: string }[] } } = await client.get(
      "/search/jql",
      {
        params: requestParams,
      },
    );
    const result = data.issues.map<Element>((issue) => ({
      label: issue.key,
      key: util.types.toString(issue.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

const selectIssueTypeFromProject = dataSource({
  display: {
    label: "Select Issue Type from Project",
    description: "Select an issue type from the specified project.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
    returnIssueTypeName: returnIssueTypeNameInput,
  },
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
});

export default {
  selectIssueType,
  selectIssueTypes,
  selectIssueTypeFromProject,
  issueFields,
  selectIssue,
};
