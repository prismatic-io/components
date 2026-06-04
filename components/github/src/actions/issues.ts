import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const issuesList = action({
  display: {
    label: "Issues List",
    description: "List issues assigned to the authenticated user",
  },
  perform: async (
    context,
    {
      connection,
      filter,
      state,
      labels,
      sort,
      direction,
      since,
      collab,
      orgs,
      owned,
      pulls,
      perPage,
      page,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/issues`, {
      params: {
        filter,
        state,
        labels,
        sort,
        direction,
        since,
        collab,
        orgs,
        owned,
        pulls,
        per_page: perPage,
        page,
      },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    filter: {
      label: "Filter",
      type: "string",
      required: false,
      default: "assigned",
      placeholder: "Select filter",
      model: [
        { label: "Assigned", value: "assigned" },
        { label: "Created", value: "created" },
        { label: "Mentioned", value: "mentioned" },
        { label: "Subscribed", value: "subscribed" },
        { label: "Repos", value: "repos" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters which issues to return based on the user's relationship to them.",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      default: "open",
      placeholder: "Select state",
      model: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters issues by their state (open, closed, or all).",
    },
    labels: {
      label: "Labels",
      type: "string",
      required: false,
      placeholder: "Enter comma-separated labels",
      example: "bug,enhancement,help wanted",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "A comma-separated list of label names to filter issues.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      placeholder: "Select sort field",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Comments", value: "comments" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The field to sort results by.",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select direction",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort results (ascending or descending).",
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      placeholder: "Enter timestamp (ISO 8601 format)",
      example: "2024-01-15T10:30:00Z",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show issues updated after the given timestamp in ISO 8601 format.",
    },
    collab: {
      label: "Collab",
      type: "boolean",
      required: false,
      comments: "When true, filters issues assigned to the authenticated user across all visible repositories including owned repositories, member repositories, and organization repositories.",
      clean: (value) => util.types.toBool(value) || undefined,
    },
    orgs: {
      label: "Orgs",
      type: "boolean",
      required: false,
      comments: "When true, filters issues assigned to the authenticated user in organization repositories.",
      clean: (value) => util.types.toBool(value) || undefined,
    },
    owned: {
      label: "Owned",
      type: "boolean",
      required: false,
      comments: "When true, filters issues assigned to the authenticated user in repositories owned by the authenticated user.",
      clean: (value) => util.types.toBool(value) || undefined,
    },
    pulls: {
      label: "Pulls",
      type: "boolean",
      required: false,
      comments: "When true, includes pull requests in the results.",
      clean: (value) => util.types.toBool(value) || undefined,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      placeholder: "Enter number of results per page",
      example: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100).",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      placeholder: "Enter page number",
      example: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The page number of the results to fetch.",
    },
  },
});

export default {
  issuesList,
};
