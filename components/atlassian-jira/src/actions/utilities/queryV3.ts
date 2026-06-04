import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { queryV3ExamplePayload } from "../../examplePayloads";
import { connectionInput, expand, maxResults, searchString } from "../../inputs";

export const queryV3 = action({
  display: {
    label: "Query",
    description: "Search the entire Jira site using a JQL query.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/search/jql", {
      params: {
        jql: params.searchString,
        expand: params.expand || undefined,
        maxResults: params.maxResults || undefined,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    searchString: {
      ...searchString,
      example: `status IN ("To Do", "In Progress", "Closed")`,
    },
    expand,
    maxResults,
  },
  examplePayload: queryV3ExamplePayload,
});
