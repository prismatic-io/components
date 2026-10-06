import {
  folderListItemSchema,
  requiredFolderRefSchema,
  requiredSpaceRefSchema,
  statusRefSchema,
} from "./shared";
const listProperties = {
  id: { type: "string" },
  name: { type: "string" },
  orderindex: { type: "integer" },
  content: { type: "string" },
  status: {
    type: "object" as const,
    properties: {
      status: { type: "string" },
      color: { type: "string" },
      hide_label: { type: "boolean" },
    },
    required: ["status", "color", "hide_label"],
  },
  priority: {
    type: "object" as const,
    properties: {
      priority: { type: "string" },
      color: { type: "string" },
    },
    required: ["priority", "color"],
  },
  task_count: { type: ["string", "null"] },
  due_date: { type: "string" },
  due_date_time: { type: "boolean" },
  start_date: { type: ["string", "null"] },
  start_date_time: { type: ["string", "null"] },
  folder: requiredFolderRefSchema,
  space: requiredSpaceRefSchema,
  statuses: { type: "array", items: statusRefSchema },
  inbound_address: { type: "string" },
};
export const createListOutputSchema = {
  type: "object" as const,
  properties: {
    ...listProperties,
    assignee: {
      type: "object" as const,
      properties: {
        id: { type: "integer" },
        color: { type: "string" },
        username: { type: "string" },
        initials: { type: "string" },
        profilePicture: { type: "string" },
      },
      required: ["id", "color", "username", "initials", "profilePicture"],
    },
  },
};
export const getListOutputSchema = {
  type: "object" as const,
  properties: {
    ...listProperties,
    assignee: { type: ["string", "null"] },
    archived: { type: "boolean" },
    override_statuses: { type: "boolean" },
    permission_level: { type: "string" },
  },
};
export const updateListOutputSchema = {
  type: "object" as const,
  properties: {
    ...listProperties,
    assignee: { type: ["string", "null"] },
  },
};
export const getListsOutputSchema = {
  type: "object" as const,
  properties: {
    lists: { type: "array", items: folderListItemSchema },
  },
  required: ["lists"],
};
