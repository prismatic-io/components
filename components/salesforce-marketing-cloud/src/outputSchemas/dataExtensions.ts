export const dataExtensionOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    key: { type: "string" },
    description: { type: "string" },
    isActive: { type: "boolean" },
    isSendable: { type: "boolean" },
    isTestable: { type: "boolean" },
    isObjectDeletable: { type: "boolean" },
    isFieldAdditionAllowed: { type: "boolean" },
    isFieldModificationAllowed: { type: "boolean" },
    sendableCustomObjectField: { type: "string" },
    sendableSubscriberField: { type: "string" },
    categoryId: { type: "number" },
    createdById: { type: "number" },
    modifiedById: { type: "number" },
    ownerId: { type: "number" },
    partnerApiObjectTypeId: { type: "number" },
    rowCount: { type: "number" },
    fieldCount: { type: "number" },
    createdByName: { type: "string" },
    modifiedByName: { type: "string" },
    ownerName: { type: "string" },
    partnerApiObjectTypeName: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    modifiedDate: { type: "string", format: "date-time" },
    dataRetentionProperties: {
      type: "object",
      properties: {
        isDeleteAtEndOfRetentionPeriod: { type: "boolean" },
        isRowBasedRetention: { type: "boolean" },
        isResetRetentionPeriodOnImport: { type: "boolean" },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};
export const listDataExtensionsOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "number" },
    page: { type: "number" },
    pageSize: { type: "number" },
    links: { type: "object", additionalProperties: true },
    items: { type: "array", items: dataExtensionOutputSchema },
  },
  additionalProperties: true,
};
export const getDataExtensionFieldsOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          id: { type: "string" },
          type: { type: "string" },
          maskType: { type: "string" },
          storageType: { type: "string" },
          description: { type: "string" },
          length: { type: "number" },
          isNullable: { type: "boolean" },
          isPrimaryKey: { type: "boolean" },
          isTemplateField: { type: "boolean" },
          isInheritable: { type: "boolean" },
          isOverridable: { type: "boolean" },
          isHidden: { type: "boolean" },
          isReadOnly: { type: "boolean" },
          mustOverride: { type: "boolean" },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const asyncUpsertRowsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    resultMessages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          resultType: { type: "string" },
          resultClass: { type: "string" },
          resultCode: { type: "string" },
          message: { type: "string" },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const upsertRowOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      keys: { type: "object", additionalProperties: true },
      values: { type: "object", additionalProperties: true },
    },
    additionalProperties: true,
  },
};
