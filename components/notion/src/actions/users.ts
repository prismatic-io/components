import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAllInput,
  pageSizeInput,
  startCursorInput,
  userIdInput,
} from "../inputs";
import { createClient } from "../client";
import { getPaginatedData } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import {
  getCurrentUserResponse,
  getUserResponse,
  listUsersResponse,
} from "../examplePayloads";

const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the currently logged in user",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/users/me");
    return { data };
  },
  examplePayload: getCurrentUserResponse,
});

const getUser = action({
  display: {
    label: "Get User by ID",
    description: "Get a user by their ID",
  },
  inputs: { connection: connectionInput, userId: userIdInput },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(`/users/${params.userId}`);
    return { data };
  },
  examplePayload: getUserResponse,
});

const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users in the workspace with optional page size",
  },
  inputs: {
    connection: connectionInput,
    startCursor: startCursorInput,
    pageSize: pageSizeInput,
    fetchAll: {
      ...fetchAllInput,
      comments:
        "Turn this on to fetch all pages. This will ignore the start cursor and page size inputs.",
    },
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.GET,
      "/users",
      params.fetchAll,
      undefined,
      {
        start_cursor: params.fetchAll ? undefined : params.startCursor,
        page_size: params.fetchAll ? MAX_PAGE_SIZE : params.pageSize,
      },
    );
    return { data };
  },
  examplePayload: listUsersResponse,
});

export default { getCurrentUser, getUser, listUsers };
