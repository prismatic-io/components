import { action, input, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { findIssueExamplePayload } from "../../examplePayloads";
import { connectionInput, fields } from "../../inputs";
import { DEFAULT_ISSUE_FIELDS } from "../constants";

export const findIssue = action({
  display: {
    label: "Find Issue",
    description: "Find an issue by attribute.",
  },
  inputs: {
    jiraConnection: connectionInput,
    searchType: input({
      label: "Search Type",
      type: "string",
      required: true,
      model: [
        { label: "Number", value: "number" },
        { label: "Summary", value: "summary" },
      ],
      comments: "Attribute to search",
      clean: (rawValue) => {
        const value = util.types.toString(rawValue);
        if (!["number", "summary"].includes(value)) {
          throw new Error(`Invalid Search Type provided: ${value}`);
        }
        return value;
      },
    }),
    searchValue: input({
      label: "Search Value",
      type: "string",
      required: true,
      comments: "Value to search for",
      clean: (rawValue) => util.types.toString(rawValue).toLowerCase().trim(),
    }),
    fields,
  },
  perform: async (context, { searchType, searchValue, jiraConnection, fields }) => {
    const client = await createV3Client(jiraConnection, context.debug.enabled);

    if (searchType === "number") {
      try {
        const { data } = await client.get("/search/jql", {
          params: {
            jql: `id=${searchValue}`,
            fields: fields || DEFAULT_ISSUE_FIELDS,
          },
        });
        return { data };
      } catch {
        return { data: [] };
      }
    }

    if (searchType === "summary") {
      const { data } = await client.get("/search/jql", {
        params: {
          jql: `summary ~ "${searchValue}"`,
          fields: fields || DEFAULT_ISSUE_FIELDS,
        },
      });
      return { data };
    }
  },
  examplePayload: findIssueExamplePayload,
});
