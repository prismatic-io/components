import {
  folderListItemSchema,
  requiredSpaceRefSchema,
  statusRefSchema,
} from "./shared";
const folderProperties = {
  id: { type: "string" },
  name: { type: "string" },
  orderindex: { type: "integer" },
  override_statuses: { type: "boolean" },
  hidden: { type: "boolean" },
  space: requiredSpaceRefSchema,
  task_count: { type: "string" },
  archived: { type: "boolean" },
  statuses: { type: "array", items: statusRefSchema },
  parent_folder: { type: "string" },
};
const folderRequired = [
  "id",
  "name",
  "orderindex",
  "override_statuses",
  "hidden",
  "space",
  "task_count",
];
const weakFolderListsSchema = {
  type: "array",
  items: { ...folderListItemSchema, required: [] },
};
const folderSchema = {
  type: "object" as const,
  properties: folderProperties,
  required: folderRequired,
};
export const createFolderOutputSchema = folderSchema;
export const updateFolderOutputSchema = folderSchema;
const subfolderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    orderindex: { type: "integer" },
    override_statuses: { type: "boolean" },
    hidden: { type: "boolean" },
    task_count: { type: "string" },
    archived: { type: "boolean" },
    statuses: { type: "array", items: statusRefSchema },
    lists: { type: "array", items: { type: "object" } },
    parent_folder: { type: "string" },
    folders: { type: "array", items: { type: "object" } },
  },
  required: [
    "id",
    "name",
    "orderindex",
    "override_statuses",
    "hidden",
    "task_count",
    "parent_folder",
  ],
};
export const getFolderOutputSchema = {
  type: "object" as const,
  properties: {
    ...folderProperties,
    permission_level: { type: "string" },
    lists: weakFolderListsSchema,
    folders: { type: "array", items: subfolderSchema },
  },
  required: [...folderRequired, "lists"],
};
export const listFoldersOutputSchema = {
  type: "object" as const,
  properties: {
    folders: {
      type: "array",
      items: {
        type: "object" as const,
        properties: { ...folderProperties, lists: weakFolderListsSchema },
        required: [...folderRequired, "lists"],
      },
    },
  },
  required: ["folders"],
};
