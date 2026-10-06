import { input, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanString, cleanStringByRequired } from "../util";
export const getTeamId = <R extends boolean>(required: R, comments?: string) =>
  input({
    label: "Team ID",
    type: "string",
    placeholder: "Enter Team ID",
    example: "9010065123",
    comments: comments
      ? comments
      : "The unique identifier for the Team (Workspace).",
    required,
    clean: cleanStringByRequired(required),
    dataSource: "teams",
  });
export const getSpaceId = <R extends boolean>(required: R, comments?: string) =>
  input({
    label: "Space ID",
    type: "string",
    placeholder: "Enter Space ID",
    comments: comments ? comments : "The unique identifier for the Space.",
    required,
    clean: cleanStringByRequired(required),
    dataSource: "spaces",
  });
export const startDate = input({
  label: "Start Date",
  type: "string",
  placeholder: "Enter start date",
  example: "1609459200000",
  comments: "Unix time in milliseconds.",
  required: false,
  clean: cleanString,
});
export const getAssignee = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Assignee",
    type: "string",
    placeholder: "Enter assignee ID",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
export const getFolderId = <R extends boolean>(
  required: R,
  comments?: string,
) =>
  input({
    label: "Folder ID",
    type: "string",
    placeholder: "Enter Folder ID",
    comments: comments
      ? comments
      : "Only include time entries associated with tasks in a specific Folder.",
    required,
    clean: cleanStringByRequired(required),
    dataSource: "folders",
  });
export const getlistId = <R extends boolean>(required: R, comments?: string) =>
  input({
    label: "List ID",
    type: "string",
    placeholder: "Enter List ID",
    comments: comments
      ? comments
      : "Only include time entries associated with tasks in a specific List.",
    required,
    clean: cleanStringByRequired(required),
    dataSource: "lists",
  });
export const getTaskId = <R extends boolean>(
  required: R,
  comments?: string,
) => {
  return input({
    label: "Task ID",
    type: "string",
    placeholder: "Enter Task ID",
    comments: comments
      ? comments
      : "Only include time entries associated with a specific task.",
    required,
    clean: cleanStringByRequired(required),
    dataSource: "tasks",
  });
};
export const getCustomTaskIds = (
  required: boolean,
  comments?: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Custom Task ID",
    type: "boolean",
    comments: comments
      ? comments
      : "When true, allows referencing a task by its custom task ID.",
    required,
    default: defaultValue !== undefined ? `${defaultValue}` : "false",
    clean: util.types.toBool,
  });
export const getArchived = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Archived",
    type: "boolean",
    comments,
    required,
    ...(defaultValue !== undefined && { default: `${defaultValue}` }),
    clean: util.types.toBool,
  });
export const getEmail = (required: boolean, comments: string) =>
  input({
    label: "Email",
    type: "string",
    placeholder: "Enter email address",
    example: "john.doe@example.com",
    comments,
    required,
    clean: util.types.toString,
  });
export const customRoleId = input({
  label: "Custom Role ID",
  type: "string",
  placeholder: "Enter Custom Role ID",
  example: "12345",
  comments: "The unique identifier for the custom role to assign.",
  required: true,
  clean: util.types.toNumber,
});
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ClickUp connection to use.",
});
export const getDescription = <R extends boolean>(
  required: R,
  comments?: string,
) =>
  input({
    label: "Description",
    type: "string",
    placeholder: "Enter description",
    comments: comments ? comments : "Description text.",
    required,
    clean: cleanStringByRequired(required),
  });
export const getStatus = <R extends boolean>(required: R, comments: string) =>
  input({
    label: "Status",
    type: "string",
    placeholder: "Enter status",
    comments,
    required,
    clean: cleanStringByRequired(required),
  });
export const getPriority = (required: boolean, comments: string) =>
  input({
    label: "Priority",
    type: "string",
    placeholder: "Enter priority",
    comments,
    required,
    clean: cleanNumber,
  });
export const getDueDateInt = (
  required: boolean,
  comments: string,
  example?: string,
) =>
  input({
    label: "Due Date",
    type: "string",
    placeholder: "Enter due date",
    comments,
    required,
    ...(example?.length && { example }),
    clean: cleanNumber,
  });
export const getDueDateTime = (
  required: boolean,
  comments: string,
  defaultValue?: boolean,
) =>
  input({
    label: "Due Date Time",
    type: "boolean",
    comments,
    required,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });
export const getNotifyAll = (
  required: boolean,
  comments: string,
  defaultValue: boolean,
) =>
  input({
    label: "Notify All",
    type: "boolean",
    required,
    comments,
    default: `${defaultValue}`,
    clean: util.types.toBool,
  });
export const listIdInput = input({
  label: "List ID",
  type: "string",
  placeholder: "Enter List ID",
  comments: "The unique identifier for the List.",
  required: true,
  clean: util.types.toString,
});
export const folderIdInput = input({
  label: "Folder ID",
  type: "string",
  placeholder: "Enter Folder ID",
  comments: "The unique identifier for the Folder.",
  required: true,
  clean: util.types.toString,
});
export const spaceIdInput = input({
  label: "Space ID",
  type: "string",
  placeholder: "Enter Space ID",
  comments: "The unique identifier for the Space.",
  required: true,
  clean: util.types.toString,
});
export const teamIdInput = input({
  label: "Team ID",
  type: "string",
  placeholder: "Enter Team ID",
  comments: "The unique identifier for the Team (Workspace).",
  required: true,
  clean: util.types.toString,
});
