import type { Connection, Element } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { isAtlassianBasicAuth } from "atlassian-utils";
import { createV3Client } from "../client";
import { CONNECTION_KEYS } from "../connections";
import type { Issue } from "../types";

export const isBasicAuth = (connection: Connection): boolean =>
  isAtlassianBasicAuth(connection, CONNECTION_KEYS);

export const validateDescription = (
  description?: string,
  ADFdescription?: object,
) => {
  if (description && ADFdescription) {
    throw new Error(
      `You can only provide a description, either "Description" or "ADF Description".`,
    );
  }

  if (description) {
    return {
      content: [
        {
          content: [
            {
              text: description,
              type: "text",
            },
          ],
          type: "paragraph",
        },
      ],
      type: "doc",
      version: 1,
    };
  }
  if (ADFdescription) {
    return ADFdescription;
  }
  return undefined;
};

export const getIssueType = (
  name: string,
  id: string,
  required = true,
): { name?: string; id?: string } | undefined => {
  const NO_CHARACTERS = 0;
  let namePresent = false;
  let idPresent = false;

  if (name) namePresent = name.length > NO_CHARACTERS;
  if (id) idPresent = id.length > NO_CHARACTERS;

  if (namePresent && idPresent) {
    throw new Error(
      `You can only provide a value for the type of issue, either "Issue Type Name" or "Issue Type ID".`,
    );
  }
  if (required) {
    if (!namePresent && !idPresent) {
      throw new Error(
        `You must provide a value for the type of issue, either "Issue Type Name" or "Issue Type ID".`,
      );
    }
    return {
      ...(namePresent && { name }),
      ...(idPresent && { id }),
    };
  }
  return undefined;
};

export const toIdRef = (id: string | undefined): { id: string } | undefined =>
  id === undefined ? undefined : { id };

export const getIssueById = async (
  client: HttpClient,
  issueId: string,
): Promise<Issue> => {
  const { data } = await client.get(`/issue/${issueId}`);
  return data;
};

export const getIssueTypes = async (
  connection: Connection,
  projectIds: { projectId: string; projectName?: string }[],
  returnIssueTypeName = false,
) => {
  const client = await createV3Client(connection);
  const promises = projectIds.map(async ({ projectId, projectName }) => {
    const { data } = await client.get<{ id: string; name: string }[]>(
      "/issuetype/project",
      {
        params: { projectId },
      },
    );
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
