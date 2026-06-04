import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const projectsGetCard = action({
  display: {
    label: "Projects Get Card",
    description: "Get a project card",
  },
  perform: async (context, { connection, cardId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/columns/cards/${cardId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    cardId: {
      label: "Card Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the card",
    },
  },
});

const projectsUpdateCard = action({
  display: {
    label: "Projects Update Card",
    description: "Update an existing project card",
  },
  perform: async (context, { connection, cardId, note, archived }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/projects/columns/cards/${cardId}`, {
      note,
      archived,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    cardId: {
      label: "Card Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the card",
    },
    note: {
      label: "Note",
      type: "string",
      required: false,
      example: "Update all gems",
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The project card"s note',
    },
    archived: {
      label: "Archived",
      type: "boolean",
      required: false,
      example: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether or not the card is archived",
    },
  },
});

const projectsDeleteCard = action({
  display: {
    label: "Projects Delete Card",
    description: "Delete a project card",
  },
  perform: async (context, { connection, cardId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/projects/columns/cards/${cardId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    cardId: {
      label: "Card Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the card",
    },
  },
});

const projectsMoveCard = action({
  display: {
    label: "Projects Move Card",
    description: "Move a project card",
  },
  perform: async (context, { connection, cardId, position, columnId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/projects/columns/cards/${cardId}/moves`,
      {
        position,
        column_id: columnId,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    cardId: {
      label: "Card Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the card",
    },
    position: {
      label: "Position",
      type: "string",
      required: true,
      example: "bottom",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The position of the card in a column",
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: false,
      example: "42",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments:
        "The unique identifier of the column the card should be moved to",
    },
  },
});

const projectsGetColumn = action({
  display: {
    label: "Projects Get Column",
    description: "Get a project column",
  },
  perform: async (context, { connection, columnId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/columns/${columnId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
  },
});

const projectsUpdateColumn = action({
  display: {
    label: "Projects Update Column",
    description: "Update an existing project column",
  },
  perform: async (context, { connection, columnId, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/projects/columns/${columnId}`, {
      name,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      example: "Remaining tasks",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the project column",
    },
  },
});

const projectsDeleteColumn = action({
  display: {
    label: "Projects Delete Column",
    description: "Delete a project column",
  },
  perform: async (context, { connection, columnId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/projects/columns/${columnId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
  },
});

const projectsListCards = action({
  display: {
    label: "Projects List Cards",
    description: "List project cards",
  },
  perform: async (
    context,
    { connection, columnId, archivedState, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/columns/${columnId}/cards`, {
      params: { archived_state: archivedState, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
    archivedState: {
      label: "Archived State",
      type: "string",
      required: false,
      default: "not_archived",
      model: [
        { label: "All", value: "all" },
        { label: "Archived", value: "archived" },
        { label: "Not Archived", value: "not_archived" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'Filters the project cards that are returned by the card"s state',
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

const projectsCreateCard = action({
  display: {
    label: "Projects Create Card",
    description: "Create a project card",
  },
  perform: async (context, { connection, columnId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/projects/columns/${columnId}/cards`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
  },
});

const projectsMoveColumn = action({
  display: {
    label: "Projects Move Column",
    description: "Move a project column",
  },
  perform: async (context, { connection, columnId, position }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/projects/columns/${columnId}/moves`, {
      position,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    columnId: {
      label: "Column Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the column",
    },
    position: {
      label: "Position",
      type: "string",
      required: true,
      example: "last",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The position of the column in a project",
    },
  },
});

const projectsGet = action({
  display: {
    label: "Projects Get",
    description: "Get a project",
  },
  perform: async (context, { connection, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const projectsUpdate = action({
  display: {
    label: "Projects Update",
    description: "Update a project",
  },
  perform: async (
    context,
    {
      connection,
      projectId,
      name,
      body,
      state,
      organizationPermission,
      isPrivate,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/projects/${projectId}`, {
      name,
      body,
      state,
      organization_permission: organizationPermission,
      private: isPrivate,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    name: {
      label: "Name",
      type: "string",
      required: false,
      example: "Week One Sprint",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the project",
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      example:
        "This project represents the sprint of the first week in January",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Body of the project",
    },
    state: {
      label: "State",
      type: "string",
      required: false,
      example: "open",
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'State of the project; either "open" or "closed"',
    },
    organizationPermission: {
      label: "Organization Permission",
      type: "string",
      required: false,
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Admin", value: "admin" },
        { label: "None", value: "none" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        "The baseline permission that all organization members have on this project",
    },
    isPrivate: {
      label: "Private",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether or not this project can be seen by everyone",
    },
  },
});

const projectsDelete = action({
  display: {
    label: "Projects Delete",
    description: "Delete a project",
  },
  perform: async (context, { connection, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/projects/${projectId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const projectsListCollaborators = action({
  display: {
    label: "Projects List Collaborators",
    description: "List project collaborators",
  },
  perform: async (
    context,
    { connection, projectId, affiliation, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}/collaborators`, {
      params: { affiliation, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    affiliation: {
      label: "Affiliation",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "Outside", value: "outside" },
        { label: "Direct", value: "direct" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters the collaborators by their affiliation",
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

const projectsAddCollaborator = action({
  display: {
    label: "Projects Add Collaborator",
    description: "Add project collaborator",
  },
  perform: async (context, { connection, projectId, username, permission }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/projects/${projectId}/collaborators/${username}`,
      {
        permission,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      default: "write",
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Admin", value: "admin" },
      ],
      example: "write",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permission to grant the collaborator",
    },
  },
});

const projectsRemoveCollaborator = action({
  display: {
    label: "Projects Remove Collaborator",
    description: "Remove user as a collaborator",
  },
  perform: async (context, { connection, projectId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/projects/${projectId}/collaborators/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const projectsGetPermissionForUser = action({
  display: {
    label: "Projects Get Permission For User",
    description: "Get project permission for a user",
  },
  perform: async (context, { connection, projectId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/projects/${projectId}/collaborators/${username}/permission`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const projectsListColumns = action({
  display: {
    label: "Projects List Columns",
    description: "List project columns",
  },
  perform: async (context, { connection, projectId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}/columns`, {
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
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
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

const projectsCreateColumn = action({
  display: {
    label: "Projects Create Column",
    description: "Create a project column",
  },
  perform: async (context, { connection, projectId, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/projects/${projectId}/columns`, {
      name,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      example: "Remaining tasks",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Name of the project column",
    },
  },
});

export default {
  projectsGetCard,
  projectsUpdateCard,
  projectsDeleteCard,
  projectsMoveCard,
  projectsGetColumn,
  projectsUpdateColumn,
  projectsDeleteColumn,
  projectsListCards,
  projectsCreateCard,
  projectsMoveColumn,
  projectsGet,
  projectsUpdate,
  projectsDelete,
  projectsListCollaborators,
  projectsAddCollaborator,
  projectsRemoveCollaborator,
  projectsGetPermissionForUser,
  projectsListColumns,
  projectsCreateColumn,
};
