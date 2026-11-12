import {
  folderItemsResponseSchema,
  folderSchema,
  foldersResponseSchema,
} from "./definitions";

export const listFoldersOutputSchema = {
  type: ["object", "array"],
  properties: foldersResponseSchema.properties,
  items: folderSchema,
  required: [],
  additionalProperties: true,
};

export const listFolderItemsOutputSchema = {
  type: ["object", "array"],
  properties: folderItemsResponseSchema.properties,
  required: [],
  additionalProperties: true,
};
