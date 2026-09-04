export const definitionResponseWithGuidSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    number: { type: "integer", format: "int64" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    name: { type: "string" },
    description: { type: "string" },
    resource: { type: "string" },
    mode: { type: "string" },
    options: {
      type: "object",
      properties: {
        createDuplicates: { type: "string" },
        matchDuplicates: { type: "string" },
        matchDuplicateParents: { type: "string" },
        fileEditionEdit: { type: "string" },
        fileEditionDelete: { type: "string" },
        filePlaceHolder: { type: "string" },
        removeValue: { type: "string" },
        multiSelectDelimiter: { type: "string" },
        useCategoryNumberFormat: { type: "string" },
        checkRefDes: { type: "string" },
        timeZone: { type: "string" },
        mergeIdenticalBOMLines: { type: "string" },
        stripWhiteSpace: { type: "string" },
        numberingFreeTextHeader: { type: "string" },
        mapping: {
          type: "array",
          items: {
            type: "object",
            properties: {
              resource: { type: "string" },
              apiName: { type: "string" },
              sourceName: { type: "string" },
              inResponse: { type: "boolean" },
              notes: { type: "string" },
            },
          },
        },
      },
    },
  },
};
export const getImportRunErrorContentOutputSchema = {
  type: "string" as const,
};
export const getImportRunResultContentOutputSchema = {
  type: "string" as const,
};
export const getImportRunSubmitContentOutputSchema = {
  type: "string" as const,
};
export const runResponseWithGuidSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    warnings: {
      type: "object",
      properties: {
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              code: { type: "integer", format: "int64" },
              message: { type: "string" },
            },
          },
        },
        count: { type: "integer", format: "int32" },
      },
    },
    number: { type: "integer", format: "int64" },
    workspaceId: { type: "integer", format: "int64" },
    creationDateTime: { type: "string", format: "date-time" },
    completionDateTime: { type: "string", format: "date-time" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    submitFileType: { type: "string", enum: ["EXCEL_WORKSHEET", "CSV"] },
    submitWorksheetName: { type: "string" },
    status: {
      type: "string",
      enum: ["CREATED", "RUNNING", "COMPLETE", "PURGED", "ERROR"],
    },
    commit: { type: "boolean" },
    totalCount: { type: "integer", format: "int64" },
    successCount: { type: "integer", format: "int64" },
    errorCount: { type: "integer", format: "int64" },
  },
};
export const listImportRunsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: runResponseWithGuidSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listImportsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: definitionResponseWithGuidSchema },
    count: { type: "integer", format: "int32" },
  },
};
