import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssuesExamplePayload } from "../../examplePayloads";
import { listIssuesInputs } from "../../inputs";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { listIssuesOutputSchema } from "../../outputSchemas";

export const listIssues = action({
  display: {
    label: "List Issues by Project",
    description: "Return a list of issues for a specific project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );

    const requestParams: Record<string, unknown> = {
      jql: `project=${params.projectId}`,
      maxResults: params.pagination.maxResults,
      fields: params.fields || DEFAULT_ISSUE_FIELDS,
    };

    if (params.pagination.nextPageToken) {
      requestParams.nextPageToken = params.pagination.nextPageToken;
    }

    const { data } = await client.get("/search/jql", {
      params: requestParams,
    });
    return { data };
  },
  examplePerform: async () => listIssuesExamplePayload,
  inputs: listIssuesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssuesOutputSchema,
  }),
  examplePayload: listIssuesExamplePayload,
});
