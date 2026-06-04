import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssuesExamplePayload } from "../../examplePayloads";
import { connectionInput, fields, maxResults, nextPageToken, projectId } from "../../inputs";
import { DEFAULT_ISSUE_FIELDS } from "../constants";

export const listIssues = action({
  display: {
    label: "List Issues by Project",
    description: "Return a list of issues for a specific project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);

    const requestParams: Record<string, unknown> = {
      jql: `project=${params.projectId}`,
      maxResults: params.maxResults || 50,
      fields: params.fields || DEFAULT_ISSUE_FIELDS,
    };

    
    if (params.nextPageToken) {
      requestParams.nextPageToken = params.nextPageToken;
    }

    const { data } = await client.get("/search/jql", {
      params: requestParams,
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId,
    nextPageToken,
    maxResults,
    fields,
  },
  examplePayload: listIssuesExamplePayload,
});
