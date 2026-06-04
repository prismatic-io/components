import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  listUsersExamplePayload,
  getUserExamplePayload,
  deleteUserExamplePayload,
  getCurrentUserExamplePayload,
} from "../examplePayloads";
import {
  connection,
  userId,
  top,
  skipToken,
  timeout,
  filter,
  orderBy,
  search,
  select,
  userPrincipalName,
  fetchAll,
} from "../inputs";
import { getUserPath, paginateResults } from "../utils";

const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(client, "/users", params.fetchAll, {
      $filter: params.filter,
      $top: params.top,
      $skipToken: params.skipToken,
      $orderby: params.orderBy,
      $search: params.search,
      $select: params.select,
    });

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    timeout,
    filter,
    top,
    skipToken,
    orderBy,
    search,
    select,
  },
  examplePayload: listUsersExamplePayload,
});

const getUser = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of an existing user",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${params.userId}`);
    return { data };
  },
  inputs: { connection, userId, timeout },
  examplePayload: getUserExamplePayload,
});

const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete the information and metadata of an existing user",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/users/${params.userId}`);
    return { data };
  },
  inputs: { connection, userId, timeout },
  examplePayload: deleteUserExamplePayload,
});

const getCurrentUser = action({
  display: {
    label: "Get Current Or Existing User",
    description:
      "Get the information and metadata of the current user or an existing user",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.get(getUserPath(params.userPrincipalName));
    return { data };
  },
  inputs: { connection, userPrincipalName, timeout },
  examplePayload: getCurrentUserExamplePayload,
});

const listUsersTeams = action({
  display: {
    label: "List User's Teams",
    description: "List all teams containing the provided user",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `/users/${params.userId}/joinedTeams`,
      params.fetchAll,
      {
        $filter: params.filter,
        $top: params.top,
        $skipToken: params.skipToken,
        $select: params.select,
        $orderby: params.orderBy,
        $search: params.search,
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    userId,
    timeout,
    filter,
    top,
    skipToken,
    orderBy,
    search,
    select,
  },
});

export default {
  listUsers,
  getUser,
  deleteUser,
  getCurrentUser,
  listUsersTeams,
};
