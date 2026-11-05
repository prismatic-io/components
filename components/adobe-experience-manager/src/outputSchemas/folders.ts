import { commandResultMessageSchema, folderListingItemSchema, jobStateSchema } from "./shared";

export const listFolderContentsOutputSchema = {
  type: "object" as const,
  properties: {
    self: folderListingItemSchema,
    children: { type: "array", items: folderListingItemSchema },
    cursor: { type: "string" },
  },
};

export const listAssetsInFolderTreeOutputSchema = {
  type: "array" as const,
  items: {
    ...folderListingItemSchema,
    properties: { ...folderListingItemSchema.properties, folderPath: { type: "string" } },
    required: ["type", "folderPath"],
  },
};

const failedFolderItemSchema = {
  type: "object",
  properties: {
    path: { type: "string" },
    id: { type: "string" },
    type: { type: "string" },
    title: { type: "string" },
    detail: { type: "string" },
    context: { type: "object" },
  },
  required: ["type", "title"],
};

const folderCommandOutputSchema = (data: Record<string, unknown>) => ({
  type: "object" as const,
  properties: {
    jobId: { type: "string" },
    state: jobStateSchema,
    status: { type: ["string", "integer"] },
    operation: { type: "string" },
    description: { type: "string" },
    data,
    errors: { type: "array", items: commandResultMessageSchema },
    warnings: { type: "array", items: commandResultMessageSchema },
  },
});

export const createFoldersOutputSchema = folderCommandOutputSchema({
  type: "object",
  properties: {
    values: {
      type: "object",
      properties: {
        successes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["FOLDER", "ASSET"] },
              folderId: { type: "string" },
              name: { type: "string" },
              title: { type: ["string", "null"] },
              path: { type: "string" },
            },
            required: ["type", "folderId", "name", "path"],
          },
        },
        failedFolders: { type: "array", items: failedFolderItemSchema },
      },
    },
  },
});

export const deleteFoldersOutputSchema = folderCommandOutputSchema({
  type: "object",
  properties: {
    deletedFolders: { type: "array", items: { type: "string" } },
    failedFolders: { type: "array", items: failedFolderItemSchema },
  },
});
