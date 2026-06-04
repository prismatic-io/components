import { action, util } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import {
  timeout,
  userId,
  siteRole,
  authSetting,
  username,
  pageNumber,
  pageSize,
  connectionInput,
  searchString,
  userSearchField,
} from "../inputs";
import {
  listUsersExamplePayload,
  searchUsersExamplePayload,
  getUserExamplePayload,
  deleteUserExamplePayload,
  createUserExamplePayload,
  updateUserExamplePayload,
} from "../examplePayloads";

export const listUsers = action({
  display: {
    label: "List users",
    description: "Retrieve a list of users connected to your Tableau site",
  },
  examplePayload: listUsersExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/users`, {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    timeout,
    pageSize,
    pageNumber,
    tableauConnection: connectionInput,
  },
});

export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Search for a specific User by a string of text",
  },
  examplePayload: searchUsersExamplePayload,
  perform: async (context, params) => {
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(
      `/users?filter=${searchField}:eq:${searchString}`,
      {
        params: {
          pageSize: util.types.toNumber(params.pageSize) || undefined,
          pageNumber: util.types.toNumber(params.pageNumber) || undefined,
        },
      },
    );

    return {
      data: response.data,
    };
  },
  inputs: {
    searchField: userSearchField,
    searchString: { ...searchString, example: "john.doe@test.com" },
    timeout,
    tableauConnection: connectionInput,
    pageNumber,
    pageSize,
  },
});

export const getUser = action({
  display: {
    label: "Get User",
    description: "Get an existing user by Id",
  },
  examplePayload: getUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),

      debug: context.debug.enabled,
    });

    const response = await client.get(`/users/${params.userId}`);

    return {
      data: response.data,
    };
  },
  inputs: { userId, timeout, tableauConnection: connectionInput },
});

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete an existing user by Id",
  },
  examplePayload: deleteUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),

      debug: context.debug.enabled,
    });
    const response = await client.delete(`/users/${params.userId}`);

    return {
      data: response.data,
    };
  },
  inputs: { userId, timeout, tableauConnection: connectionInput },
});

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user in your tableau site",
  },
  examplePayload: createUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });

    const response = await client.post(`/users`, {
      user: {
        name: params.username,
        siteRole: params.siteRole,
        authSetting: params.authSetting,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: {
    username,
    siteRole,
    authSetting,
    timeout,
    tableauConnection: connectionInput,
  },
});

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update the information and metadata of an existing user",
  },
  examplePayload: updateUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });

    const response = client.put(`/users/${params.userId}`, {
      user: {
        name: params.username,
        siteRole: params.siteRole,
        authSetting: params.authSetting,
      },
    });

    return {
      data: (await response).data,
    };
  },
  inputs: {
    userId,
    username,
    siteRole,
    authSetting,
    timeout,
    tableauConnection: connectionInput,
  },
});
