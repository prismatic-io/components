import { folderFullSchema } from "./common";

const copiedOrMovedObjectSchema = {
  type: "object" as const,
  properties: {
    ...folderFullSchema.properties,
    type: { type: "string", enum: ["file", "folder"] },
  },
  required: ["id", "type"],
  additionalProperties: true,
};

export const copyObjectOutputSchema = copiedOrMovedObjectSchema;

export const moveObjectOutputSchema = copiedOrMovedObjectSchema;

export const pathDetailsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      id: { type: "string" },
      type: { type: "string" },
      name: { type: "string" },
    },
    required: [],
  },
};

export const deleteObjectOutputSchema = {
  type: "object" as const,
  properties: {},
  required: [] as string[],
  additionalProperties: false,
};
