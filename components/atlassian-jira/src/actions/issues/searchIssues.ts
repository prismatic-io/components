import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { searchIssuesExamplePayload } from "../../examplePayloads";
import { searchIssuesInputs } from "../../inputs";
import { quoteJqlString } from "../../util";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { searchIssuesOutputSchema } from "../../outputSchemas";

export const searchIssues = action({
  display: {
    label: "Search Issues",
    description: "Return a list of issues that match the given string of text.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );

    let jql = `summary ~ ${quoteJqlString(params.searchString)}`;
    if (params.projectKey) {
      jql += ` AND project = ${quoteJqlString(params.projectKey)}`;
    }

    const { data } = await client.get("/search/jql", {
      params: {
        jql: jql || undefined,
        fields: params.fields || DEFAULT_ISSUE_FIELDS,
      },
    });
    return { data };
  },
  examplePerform: async () => searchIssuesExamplePayload,
  inputs: searchIssuesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchIssuesOutputSchema,
  }),
  examplePayload: searchIssuesExamplePayload,
});
