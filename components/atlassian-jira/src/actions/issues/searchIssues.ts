import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { searchIssuesExamplePayload } from "../../examplePayloads";
import { connectionInput, fields, projectKey, searchString } from "../../inputs";
import { DEFAULT_ISSUE_FIELDS } from "../constants";

export const searchIssues = action({
  display: {
    label: "Search Issues",
    description: "Return a list of issues that match the given string of text.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);

    let jql = `summary ~ "${params.searchString}"`;
    if (params.projectKey) {
      jql += `and project = "${params.projectKey}"`;
    }

    const { data } = await client.get("/search/jql", {
      params: {
        jql: jql || undefined,
        fields: params.fields || DEFAULT_ISSUE_FIELDS,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    searchString,
    projectKey,
    fields,
  },
  examplePayload: searchIssuesExamplePayload,
});
