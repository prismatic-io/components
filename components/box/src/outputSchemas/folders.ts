import { folderFullSchema, folderItemSchema } from "./common";
export const createFolderOutputSchema = folderFullSchema;
export const listFolderWithPaginationOutputSchema = {
  type: "object" as const,
  properties: {
    entries: { type: "array", items: folderItemSchema },
    pagination: {
      type: ["object", "number"],
      properties: {
        next_marker: { type: ["string", "null"] },
        limit: { type: "integer" },
      },
    },
  },
  required: ["entries", "pagination"],
};
