import { identitySetSchema, itemReferenceSchema, sharepointIdsSchema } from "./common";

export const listSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    displayName: { type: "string" },
    description: { type: "string" },
    eTag: { type: "string" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
    sharepointIds: sharepointIdsSchema,
    system: { type: "object" },
    list: {
      type: "object",
      properties: {
        contentTypesEnabled: { type: "boolean" },
        hidden: { type: "boolean" },
        template: { type: "string" },
      },
    },
  },
  required: ["id"],
};

const listItemFieldsSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    Title: { type: "string" },
    Status: { type: "string" },
    AssignedTo: { type: "string" },
    DueDate: { type: "string" },
    CompletedDate: { type: "string" },
  },
  required: [],
  additionalProperties: true,
};

export const listItemSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    eTag: { type: "string" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
    sharepointIds: sharepointIdsSchema,
    contentType: {
      type: "object",
      properties: { id: { type: "string" }, name: { type: "string" } },
    },
    deleted: { type: "object", properties: { state: { type: "string" } } },
    fields: listItemFieldsSchema,
  },
  required: ["id"],
};

const selectedListItemSchema = { ...listItemSchema, required: [] };

export const listSiteListsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: listSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const getListOutputSchema = listSchema;

export const listListItemsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: selectedListItemSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const getListItemOutputSchema = selectedListItemSchema;

export const createListItemOutputSchema = listItemSchema;
