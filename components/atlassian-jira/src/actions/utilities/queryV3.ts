import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { queryV3ExamplePayload } from "../../examplePayloads";
import { queryV3Inputs } from "../../inputs";
import { queryV3OutputSchema } from "../../outputSchemas";

export const queryV3 = action({
  display: {
    label: "Query",
    description: "Search the entire Jira site using a JQL query.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/search/jql", {
      params: {
        jql: params.searchString,
        expand: params.expand || undefined,
        maxResults: params.maxResults || undefined,
      },
    });
    return { data };
  },
  examplePerform: async () => queryV3ExamplePayload,
  inputs: queryV3Inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryV3OutputSchema,
  }),
  examplePayload: queryV3ExamplePayload,
});
