import { dataSource, type Element, input, util } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { connectionInput } from "../inputs";


const listIdInput = input({
  label: "List ID",
  type: "string",
  placeholder: "Enter List ID",
  comments: "The unique identifier for the List.",
  required: true,
  clean: util.types.toString,
});

const folderIdInput = input({
  label: "Folder ID",
  type: "string",
  placeholder: "Enter Folder ID",
  comments: "The unique identifier for the Folder.",
  required: true,
  clean: util.types.toString,
});

const spaceIdInput = input({
  label: "Space ID",
  type: "string",
  placeholder: "Enter Space ID",
  comments: "The unique identifier for the Space.",
  required: true,
  clean: util.types.toString,
});

const teamIdInput = input({
  label: "Team ID",
  type: "string",
  placeholder: "Enter Team ID",
  comments: "The unique identifier for the Team (Workspace).",
  required: true,
  clean: util.types.toString,
});

interface TypeConfig {
  options: { id: string; name: string }[];
}
interface CustomField {
  id: string;
  name: string;
  type_config?: TypeConfig;
}

interface Task {
  id: string;
  name: string;
}

interface Calendar {
  id: string;
  name: string;
  type?: string;
}
export const customFieldOptions = dataSource({
  display: {
    label: "Select Custom Field Option",
    description: "Select an option from a given custom field.",
  },
  perform: async (_context, { listId, connection, fieldName }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ fields: CustomField[] }>(`/list/${listId}/field`);
    const field = data.fields.find((field) => field.name === fieldName);
    if (!field) {
      throw new Error("Unable to find custom field options");
    }
    const options = (field?.type_config?.options || []).map<Element>((option) => {
      return { label: option.name, key: option.id };
    });
    return { result: options };
  },
  inputs: {
    listId: listIdInput,
    connection: connectionInput,
    fieldName: input({
      label: "Field Name",
      type: "string",
      placeholder: "Enter field name",
      example: "Sales Stage",
      comments: "The name of the custom field whose options should be returned.",
      required: true,
      default: "Sales Stage",
      clean: util.types.toString,
    }),
  },
  dataSourceType: "picklist",
});
export const folders = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a folder from a space.",
  },
  perform: async (_context, { connection, spaceId }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ folders: Record<string, string>[] }>(`/space/${spaceId}/folder`);
    const options = data.folders.map<Element>((folder) => {
      return { label: folder.name, key: folder.id };
    });
    return { result: options };
  },
  inputs: {
    connection: connectionInput,
    spaceId: spaceIdInput,
  },
  dataSourceType: "picklist",
});
export const teams = dataSource({
  display: {
    label: "Select Authorized Workspace",
    description: "Select a workspace available to the authenticated user.",
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ teams: Record<string, string>[] }>("/team");
    const options = data.teams.map<Element>((field) => {
      return { label: field.name, key: field.id };
    });
    return { result: options };
  },
  inputs: { connection: connectionInput },
  dataSourceType: "picklist",
});
export const spaces = dataSource({
  display: {
    label: "Select Space",
    description: "Select a space available in a workspace.",
  },
  perform: async (_context, { connection, teamId }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ spaces: Record<string, string>[] }>(`/team/${teamId}/space`);
    const options = data.spaces.map<Element>((space) => {
      return { label: space.name, key: space.id };
    });
    return { result: options };
  },
  inputs: {
    connection: connectionInput,
    teamId: teamIdInput,
  },
  dataSourceType: "picklist",
});
export const lists = dataSource({
  display: {
    label: "Select List",
    description: "Select an available list in a given folder.",
  },
  perform: async (_context, { folderId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ lists: Record<string, string>[] }>(`/folder/${folderId}/list`);
    const options = data.lists.map<Element>((list) => {
      return { label: list.name, key: list.id };
    });
    return { result: options };
  },
  inputs: { folderId: folderIdInput, connection: connectionInput },
  dataSourceType: "picklist",
});

export const customFields = dataSource({
  display: {
    label: "Select Custom Field",
    description: "Select a custom field from a list.",
  },
  perform: async (_context, { listId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ fields: Record<string, string>[] }>(`/list/${listId}/field`);
    const options = data.fields.map<Element>((field) => {
      return { label: field.name, key: field.id };
    });
    return { result: options };
  },
  inputs: { listId: listIdInput, connection: connectionInput },
  dataSourceType: "picklist",
});

export const tasks = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from a list.",
  },
  perform: async (_context, { listId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ tasks: Task[] }>(`/list/${listId}/task`, {
      params: {
        archived: false,
        include_closed: false,
        subtasks: false,
      },
    });
    const options = data.tasks.map<Element>((task) => {
      return { label: task.name, key: task.id };
    });
    return { result: options };
  },
  inputs: { listId: listIdInput, connection: connectionInput },
  dataSourceType: "picklist",
});

export const calendars = dataSource({
  display: {
    label: "Select Calendar View",
    description: "Select a calendar view from a space.",
  },
  perform: async (_context, { spaceId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<{ views: Calendar[] }>(`/space/${spaceId}/view`, {
      params: {
        include_closed: false,
      },
    });
    
    const calendarViews = data.views.filter(
      (view) => view.type === "calendar" || view.name.toLowerCase().includes("calendar")
    );
    const options = calendarViews.map<Element>((view) => {
      return { label: view.name, key: view.id };
    });
    return { result: options };
  },
  inputs: { spaceId: spaceIdInput, connection: connectionInput },
  dataSourceType: "picklist",
});

export default {
  customFieldOptions,
  customFields,
  lists,
  folders,
  spaces,
  teams,
  tasks,
  calendars,
};
