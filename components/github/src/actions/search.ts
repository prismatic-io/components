import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const searchCode = action({
  display: {
    label: "Search Code",
    description: "Search code",
  },
  perform: async (context, { connection, q, sort, order, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/code`, {
      params: { q, sort, order, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "addClass in:file language:js repo:octocat/Spoon-Knife",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords and qualifiers. See [GitHub search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax) for details.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [{ label: "Indexed", value: "indexed" }],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The field to sort results by.",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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

const searchCommits = action({
  display: {
    label: "Search Commits",
    description: "Search commits",
  },
  perform: async (context, { connection, q, sort, order, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/commits`, {
      params: { q, sort, order, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "fix bug repo:octocat/Hello-World",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords and qualifiers. See [GitHub search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax) for details.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Author Date", value: "author-date" },
        { label: "Committer Date", value: "committer-date" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The field to sort results by (author date or committer date).",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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

const searchIssuesAndPullRequests = action({
  display: {
    label: "Search Issues And Pull Requests",
    description: "Search issues and pull requests",
  },
  perform: async (context, { connection, q, sort, order, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/issues`, {
      params: { q, sort, order, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "type:pr is:open repo:octocat/Hello-World",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords and qualifiers. See [GitHub search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax) for details.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Comments", value: "comments" },
        { label: "Reactions", value: "reactions" },
        { label: "Reactions +1", value: "reactions-+1" },
        { label: "Reactions -1", value: "reactions--1" },
        { label: "Reactions Smile", value: "reactions-smile" },
        { label: "Reactions Thinking Face", value: "reactions-thinking_face" },
        { label: "Reactions Heart", value: "reactions-heart" },
        { label: "Reactions Tada", value: "reactions-tada" },
        { label: "Interactions", value: "interactions" },
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The field to sort results by (comments, reactions, interactions, created, or updated).",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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

const searchLabels = action({
  display: {
    label: "Search Labels",
    description: "Search labels",
  },
  perform: async (
    context,
    { connection, repositoryId, q, sort, order, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/labels`, {
      params: {
        repository_id: repositoryId,
        q,
        sort,
        order,
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
    repositoryId: {
      label: "Repository ID",
      type: "string",
      required: true,
      placeholder: "Enter repository ID",
      example: "123456789",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the repository.",
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "bug",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search keywords to find labels.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The field to sort results by (created or updated).",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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

const searchRepos = action({
  display: {
    label: "Search Repos",
    description: "Search repositories",
  },
  perform: async (context, { connection, q, sort, order, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/repositories`, {
      params: { q, sort, order, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "tetris language:assembly",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords and qualifiers. See [GitHub search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax) for details.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Stars", value: "stars" },
        { label: "Forks", value: "forks" },
        { label: "Help Wanted Issues", value: "help-wanted-issues" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The field to sort results by (stars, forks, help-wanted-issues, or updated).",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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

const searchTopics = action({
  display: {
    label: "Search Topics",
    description: "Search topics",
  },
  perform: async (context, { connection, q, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/topics`, {
      params: { q, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "ruby",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords.",
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

const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Search users",
  },
  perform: async (context, { connection, q, sort, order, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/search/users`, {
      params: { q, sort, order, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    q: {
      label: "Query",
      type: "string",
      required: true,
      placeholder: "Enter search query",
      example: "tom location:San Francisco",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The search query containing one or more search keywords and qualifiers. See [GitHub search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax) for details.",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      placeholder: "Select sort field",
      model: [
        { label: "Followers", value: "followers" },
        { label: "Repositories", value: "repositories" },
        { label: "Joined", value: "joined" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The field to sort results by (followers, repositories, or joined date).",
    },
    order: {
      label: "Order",
      type: "string",
      required: false,
      default: "desc",
      placeholder: "Select order",
      model: [
        { label: "Desc", value: "desc" },
        { label: "Asc", value: "asc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The sort order (descending or ascending).",
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
  searchCode,
  searchCommits,
  searchIssuesAndPullRequests,
  searchLabels,
  searchRepos,
  searchTopics,
  searchUsers,
};
