export const downloadExportRunFileContentOutputSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    contentType: { type: "string" },
    filename: { type: "string" },
    size: { type: "integer" },
  },
  required: ["content", "contentType", "filename", "size"],
};
export const exportDefinitionSchema = {
  type: "object" as const,
  properties: {
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    criteria: {
      type: "array",
      items: { type: "object" },
      properties: { empty: { type: "boolean" } },
    },
    description: { type: "string" },
    name: { type: "string" },
    number: { type: "integer", format: "int64" },
    world: { type: "string" },
    options: {
      type: "object",
      properties: {
        bomLevels: { type: "string" },
        exportViews: { type: "array", items: { type: "string" } },
        revisionStatus: { type: "string" },
        header: { type: "string" },
        format: { type: "string" },
        enableNotifications: { type: "boolean" },
        fileContent: {
          type: "object",
          properties: {
            item: { type: "string", enum: ["NONE", "PRIMARY", "ALL"] },
            supplierItem: { type: "string", enum: ["NONE", "PRIMARY", "ALL"] },
          },
        },
      },
    },
  },
};
export const exportRunSchema = {
  type: "object" as const,
  properties: {
    completionDateTime: { type: "string" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    criteria: {
      type: "array",
      items: { type: "object" },
      properties: { empty: { type: "boolean" } },
    },
    criteriaResultsCount: { type: "integer", format: "int32" },
    guid: { type: "string" },
    number: { type: "integer", format: "int32" },
    status: { type: "string" },
    files: {
      type: "array",
      items: {
        type: "object",
        properties: {
          author: {
            type: "object",
            properties: {
              email: { type: "string" },
              fullName: { type: "string" },
              guid: { type: "string" },
            },
          },
          guid: { type: "string" },
          name: { type: "string" },
          storageMethodName: { type: "string" },
        },
      },
    },
  },
};
export const listExportRunsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: exportRunSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listExportsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: exportDefinitionSchema },
    count: { type: "integer", format: "int32" },
  },
};
