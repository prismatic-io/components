export const createExtractOutputSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    number: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    enabled: { type: "boolean" },
    format: { type: "string" },
    creator: {
      type: "object",
      properties: {
        guid: { type: "string" },
        fullName: { type: "string" },
        email: { type: "string" },
      },
    },
    creationDateTime: { type: "string" },
    lastModifiedDateTime: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
  },
};
export const deleteExtractOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
};
export const downloadExtractRunFileContentOutputSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    contentType: { type: "string" },
    filename: { type: "string" },
    size: { type: "integer" },
  },
  required: ["content", "contentType", "filename", "size"],
};
export const extractSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    enabled: { type: "boolean" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    creationDateTime: { type: "string" },
    notifications: { type: "string" },
  },
};
export const runFileAssociationSchema = {
  type: "object" as const,
  properties: {
    file: {
      type: "object",
      properties: {
        author: {
          type: "object",
          properties: { fullName: { type: "string" } },
        },
        category: {
          type: "object",
          properties: { guid: { type: "string" }, name: { type: "string" } },
        },
        checkedOut: { type: "boolean" },
        checkoutDateTime: { type: "string" },
        corrected: { type: "boolean" },
        creationDateTime: { type: "string" },
        description: { type: "string" },
        edition: { type: "string" },
        format: { type: "string" },
        guid: { type: "string" },
        hasMarkup: { type: "boolean" },
        haveContent: { type: "boolean" },
        lastModifiedDateTime: { type: "string" },
        latest: { type: "boolean" },
        location: { type: "string" },
        locked: { type: "boolean" },
        microsoft365: {
          type: "object",
          properties: {
            authorEmail: { type: "string" },
            creationDate: { type: "string" },
            driveId: { type: "string" },
            fileId: { type: "string" },
            fileName: { type: "string" },
            lastEditors: { type: "array", items: { type: "string" } },
            modifiedDate: { type: "string" },
            originalAuthor: { type: "string" },
            siteId: { type: "string" },
            size: { type: "integer", format: "int64" },
            version: { type: "string" },
            webUrl: { type: "string" },
          },
        },
        googleDocs: {
          type: "object",
          properties: {
            authorEmail: { type: "string" },
            creationDate: { type: "string" },
            driveId: { type: "string" },
            fileId: { type: "string" },
            fileName: { type: "string" },
            lastEditors: { type: "array", items: { type: "string" } },
            modifiedDate: { type: "string" },
            originalAuthor: { type: "string" },
            size: { type: "integer", format: "int64" },
            version: { type: "string" },
            webUrl: { type: "string" },
          },
        },
        mimeType: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        size: { type: "integer", format: "int64" },
        storageMethodName: { type: "string" },
        title: { type: "string" },
        private: { type: "boolean" },
      },
    },
    downloadDateTime: { type: "string" },
    guid: { type: "string" },
  },
};
export const listExtractRunFilesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: runFileAssociationSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const runSchema = {
  type: "object" as const,
  properties: {
    completionDate: { type: "string" },
    completionDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    guid: { type: "string" },
    runDateTime: { type: "string" },
    scheduledDateTime: { type: "string" },
    status: { type: "string" },
    type: { type: "string" },
    viewsExtracted: { type: "integer", format: "int64" },
    files: {
      type: "array",
      items: {
        type: "object",
        properties: {
          downloadDateTime: { type: "string" },
          guid: { type: "string" },
        },
      },
    },
  },
};
export const listExtractRunsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: runSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listExtractsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: extractSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const updateExtractOutputSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    number: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    enabled: { type: "boolean" },
    format: { type: "string" },
    creator: {
      type: "object",
      properties: {
        guid: { type: "string" },
        fullName: { type: "string" },
        email: { type: "string" },
      },
    },
    creationDateTime: { type: "string" },
    lastModifiedDateTime: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
  },
};
