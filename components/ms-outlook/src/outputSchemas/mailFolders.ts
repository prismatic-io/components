import {
  deleteResultSchema,
  nullableBoolean,
  nullableInteger,
  nullableString,
  stringArray,
} from "./shared";

const mailFolderSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": nullableString,
    childFolderCount: nullableInteger,
    displayName: nullableString,
    id: { type: "string" },
    isHidden: nullableBoolean,
    parentFolderId: nullableString,
    totalItemCount: nullableInteger,
    unreadItemCount: nullableInteger,
  },
  required: ["id"],
};

const mailFolderListItemSchema = {
  ...mailFolderSchema,
  properties: {
    ...mailFolderSchema.properties,
    filterQuery: nullableString,
    includeNestedFolders: nullableBoolean,
    isSupported: nullableBoolean,
    sourceFolderIds: stringArray,
  },
};

export const createMailFolderOutputSchema = {
  ...mailFolderSchema,
  properties: {
    "@odata.context": nullableString,
    ...mailFolderSchema.properties,
  },
};

export const listMailFoldersOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: mailFolderListItemSchema },
    "@odata.nextLink": nullableString,
  },
  required: ["value"],
};

export const deleteMailFolderOutputSchema = deleteResultSchema;
