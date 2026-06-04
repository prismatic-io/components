import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const gistsList = action({
  display: {
    label: "Gists List",
    description: "List gists for the authenticated user",
  },
  perform: async (context, { connection, since, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists`, {
      params: { since, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsCreate = action({
  display: {
    label: "Gists Create",
    description: "Create a gist",
  },
  perform: async (context, { connection, description, files, isPublic }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/gists`, {
      description,
      files,
      public: isPublic,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      example: "Example Ruby script",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Description of the gist",
    },
    files: {
      label: "Files",
      type: "string",
      required: true,
      example: "[object Object]",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Names and content for the files that make up the gist",
    },
    isPublic: {
      label: "Public",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const gistsListPublic = action({
  display: {
    label: "Gists List Public",
    description: "List public gists",
  },
  perform: async (context, { connection, since, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/public`, {
      params: { since, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsListStarred = action({
  display: {
    label: "Gists List Starred",
    description: "List starred gists",
  },
  perform: async (context, { connection, since, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/starred`, {
      params: { since, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsGet = action({
  display: {
    label: "Gists Get",
    description: "Get a gist",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsUpdate = action({
  display: {
    label: "Gists Update",
    description: "Update a gist",
  },
  perform: async (context, { connection, gistId, description, files }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/gists/${gistId}`, {
      description,
      files,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      example: "Example Ruby script",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Description of the gist",
    },
    files: {
      label: "Files",
      type: "string",
      required: false,
      example: "[object Object]",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Names of files to be updated",
    },
  },
});

const gistsDelete = action({
  display: {
    label: "Gists Delete",
    description: "Delete a gist",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/gists/${gistId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsListComments = action({
  display: {
    label: "Gists List Comments",
    description: "List gist comments",
  },
  perform: async (context, { connection, gistId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/comments`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsCreateComment = action({
  display: {
    label: "Gists Create Comment",
    description: "Create a gist comment",
  },
  perform: async (context, { connection, gistId, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/gists/${gistId}/comments`, { body });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      example: "Body of the attachment",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The comment text",
    },
  },
});

const gistsGetComment = action({
  display: {
    label: "Gists Get Comment",
    description: "Get a gist comment",
  },
  perform: async (context, { connection, gistId, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/comments/${commentId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const gistsUpdateComment = action({
  display: {
    label: "Gists Update Comment",
    description: "Update a gist comment",
  },
  perform: async (context, { connection, gistId, commentId, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/gists/${gistId}/comments/${commentId}`,
      { body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      example: "Body of the attachment",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The comment text",
    },
  },
});

const gistsDeleteComment = action({
  display: {
    label: "Gists Delete Comment",
    description: "Delete a gist comment",
  },
  perform: async (context, { connection, gistId, commentId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/gists/${gistId}/comments/${commentId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    commentId: {
      label: "Comment Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the comment",
    },
  },
});

const gistsListCommits = action({
  display: {
    label: "Gists List Commits",
    description: "List gist commits",
  },
  perform: async (context, { connection, gistId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/commits`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsListForks = action({
  display: {
    label: "Gists List Forks",
    description: "List gist forks",
  },
  perform: async (context, { connection, gistId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/forks`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const gistsFork = action({
  display: {
    label: "Gists Fork",
    description: "Fork a gist",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/gists/${gistId}/forks`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsCheckIsStarred = action({
  display: {
    label: "Gists Check Is Starred",
    description: "Check if a gist is starred",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/star`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsStar = action({
  display: {
    label: "Gists Star",
    description: "Star a gist",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/gists/${gistId}/star`, {});
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsUnstar = action({
  display: {
    label: "Gists Unstar",
    description: "Unstar a gist",
  },
  perform: async (context, { connection, gistId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/gists/${gistId}/star`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
  },
});

const gistsGetRevision = action({
  display: {
    label: "Gists Get Revision",
    description: "Get a gist revision",
  },
  perform: async (context, { connection, gistId, sha }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gists/${gistId}/${sha}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    gistId: {
      label: "Gist Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The unique identifier of the gist",
    },
    sha: {
      label: "Sha",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  gistsList,
  gistsCreate,
  gistsListPublic,
  gistsListStarred,
  gistsGet,
  gistsUpdate,
  gistsDelete,
  gistsListComments,
  gistsCreateComment,
  gistsGetComment,
  gistsUpdateComment,
  gistsDeleteComment,
  gistsListCommits,
  gistsListForks,
  gistsFork,
  gistsCheckIsStarred,
  gistsStar,
  gistsUnstar,
  gistsGetRevision,
};
