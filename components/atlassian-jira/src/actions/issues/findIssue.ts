import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { findIssueExamplePayload } from "../../examplePayloads";
import { findIssueInputs } from "../../inputs";
import { isIssueKeyOrId, quoteJqlString } from "../../util";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { findIssueOutputSchema } from "../../outputSchemas";

export const findIssue = action({
  display: {
    label: "Find Issue",
    description: "Find an issue by attribute.",
  },
  inputs: findIssueInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { searchType, searchValue, jiraConnection, fields },
  ) => {
    const client = await createV3Client(jiraConnection, context.debug.enabled);

    if (searchType === "number") {
      if (!isIssueKeyOrId(searchValue)) {
        return { data: [] };
      }
      try {
        const { data } = await client.get("/search/jql", {
          params: {
            jql: `id=${searchValue}`,
            fields: fields || DEFAULT_ISSUE_FIELDS,
          },
        });
        return { data };
      } catch (error) {
        if (
          (error as { response?: { status?: number } }).response?.status === 400
        ) {
          return { data: [] };
        }
        throw error;
      }
    }

    if (searchType === "summary") {
      const { data } = await client.get("/search/jql", {
        params: {
          jql: `summary ~ ${quoteJqlString(searchValue)}`,
          fields: fields || DEFAULT_ISSUE_FIELDS,
        },
      });
      return { data };
    }
  },
  examplePerform: async () => findIssueExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findIssueOutputSchema,
  }),
  examplePayload: findIssueExamplePayload,
});
