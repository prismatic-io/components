export const bomSettingSchema = {
  type: "object" as const,
  properties: {
    automaticallyGenerateLineNumbers: { type: "boolean" },
    checkReferenceDesignators: { type: "boolean" },
  },
};
export const bomSubstituteSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revisionNumber: { type: "string" },
        revisionStatus: { type: "string" },
      },
    },
    notes: { type: "string" },
    quantity: { type: "number", format: "double" },
    rank: { type: "integer", format: "int32" },
  },
};
export const deleteBomLineOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteBomSubstituteOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const itemBomSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revisionNumber: { type: "string" },
        revisionStatus: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    lineNumber: { type: "number", format: "double" },
    notes: { type: "string" },
    quantity: { type: "number", format: "double" },
    refDes: { type: "string" },
    additionalAttributes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          apiName: { type: "string" },
          fieldType: {
            type: "string",
            enum: [
              "SINGLE_LINE_TEXT",
              "MULTI_LINE_TEXT",
              "DROP_DOWN",
              "FIXED_DROP_DOWN",
              "DATE",
              "NUMBER",
              "BOOLEAN",
              "INTEGER",
              "OBJECT",
              "POSITIVE_DOUBLE",
              "POSITIVE_INTEGER",
              "RICH_TEXT",
              "GUID",
              "DATETIME",
              "COST",
              "LIST",
              "ENUM",
            ],
          },
          guid: { type: "string" },
          multiSelect: { type: "boolean" },
          name: { type: "string" },
          value: {},
        },
      },
    },
  },
};
export const itemBomWithSubstituteSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revisionNumber: { type: "string" },
        revisionStatus: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    lineNumber: { type: "number", format: "double" },
    notes: { type: "string" },
    quantity: { type: "number", format: "double" },
    refDes: { type: "string" },
    substitutes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          guid: { type: "string" },
          item: {
            type: "object",
            properties: {
              guid: { type: "string" },
              name: { type: "string" },
              number: { type: "string" },
              revisionNumber: { type: "string" },
              revisionStatus: { type: "string" },
            },
          },
          notes: { type: "string" },
          quantity: { type: "number", format: "double" },
          rank: { type: "integer", format: "int32" },
        },
      },
    },
    additionalAttributes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          apiName: { type: "string" },
          fieldType: {
            type: "string",
            enum: [
              "SINGLE_LINE_TEXT",
              "MULTI_LINE_TEXT",
              "DROP_DOWN",
              "FIXED_DROP_DOWN",
              "DATE",
              "NUMBER",
              "BOOLEAN",
              "INTEGER",
              "OBJECT",
              "POSITIVE_DOUBLE",
              "POSITIVE_INTEGER",
              "RICH_TEXT",
              "GUID",
              "DATETIME",
              "COST",
              "LIST",
              "ENUM",
            ],
          },
          guid: { type: "string" },
          multiSelect: { type: "boolean" },
          name: { type: "string" },
          value: {},
        },
      },
    },
  },
};
export const listBomOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemBomWithSubstituteSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listBomSubstitutesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: bomSubstituteSchema },
    count: { type: "integer", format: "int32" },
  },
};
