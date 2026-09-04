export const categorySchema = {
  type: "object" as const,
  properties: {
    activated: { type: "boolean" },
    assignable: { type: "boolean" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    description: { type: "string" },
    guid: { type: "string" },
    level: { type: "integer", format: "int32" },
    name: { type: "string" },
    numberFormat: {
      type: "object",
      properties: {
        guid: { type: "string" },
        fields: {
          type: "array",
          items: {
            type: "object",
            properties: { guid: { type: "string" }, value: { type: "string" } },
          },
        },
      },
    },
    parentCategory: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    path: { type: "string" },
    requirements: {
      type: "array",
      items: {
        type: "object",
        properties: {
          assignee: {
            type: "object",
            properties: {
              email: { type: "string" },
              fullName: { type: "string" },
              guid: { type: "string" },
            },
          },
          creationDateTime: { type: "string" },
          creator: {
            type: "object",
            properties: {
              email: { type: "string" },
              fullName: { type: "string" },
              guid: { type: "string" },
            },
          },
          modifier: {
            type: "object",
            properties: {
              email: { type: "string" },
              fullName: { type: "string" },
              guid: { type: "string" },
            },
          },
          modificationDateTime: { type: "string" },
          description: { type: "string" },
          guid: { type: "string" },
          title: { type: "string" },
          number: { type: "string" },
          priority: { type: "string" },
          status: {
            type: "object",
            properties: {
              guid: { type: "string" },
              value: { type: "string" },
              code: { type: "string" },
            },
          },
          template: {
            type: "object",
            properties: { guid: { type: "string" }, name: { type: "string" } },
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
      },
    },
    structural: { type: "boolean" },
    systemDefined: { type: "boolean" },
  },
};
export const deleteFileOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    fileGuid: { type: "string" },
    statusCode: { type: "integer" },
  },
  required: ["success", "message", "fileGuid", "statusCode"],
};
export const downloadFileContentOutputSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    contentType: { type: "string" },
    filename: { type: "string" },
    size: { type: "integer" },
  },
  required: ["content", "contentType", "filename", "size"],
};
export const fileAssociationMarkupSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    reserved: { type: "boolean" },
    markup: {
      type: "object",
      properties: {
        category: {
          type: "object",
          properties: { guid: { type: "string" }, name: { type: "string" } },
        },
        author: {
          type: "object",
          properties: { fullName: { type: "string" } },
        },
        creationDateTime: { type: "string" },
        format: { type: "string" },
        guid: { type: "string" },
        lastModifiedDateTime: { type: "string" },
        location: { type: "string" },
        mimeType: { type: "string" },
        name: { type: "string" },
        size: { type: "integer", format: "int64" },
        haveContent: { type: "boolean" },
        storageMethodName: { type: "string" },
        title: { type: "string" },
        locked: { type: "boolean" },
      },
    },
    markupOf: {
      type: "object",
      properties: {
        author: {
          type: "object",
          properties: { fullName: { type: "string" } },
        },
        edition: { type: "string" },
        guid: { type: "string" },
        number: { type: "string" },
      },
    },
    reservedUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const fileCorrectionSchema = {
  type: "object" as const,
  properties: {
    comments: { type: "string" },
    correctedDateTime: { type: "string" },
    guid: { type: "string" },
    notes: { type: "string" },
    correctedUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
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
  },
};
export const fileDetailSchema = {
  type: "object" as const,
  properties: {
    author: { type: "object", properties: { fullName: { type: "string" } } },
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
};
export const fileFullSchema = {
  type: "object" as const,
  properties: {
    category: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    checkedOut: { type: "boolean" },
    corrected: { type: "boolean" },
    creationDateTime: { type: "string" },
    edition: { type: "string" },
    format: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    number: { type: "string" },
    storageMethodName: { type: "string" },
    title: { type: "string" },
  },
};
export const getFileWatermarkContentOutputSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    contentType: { type: "string" },
    filename: { type: "string" },
    size: { type: "integer" },
  },
  required: ["content", "contentType", "filename", "size"],
};
export const listFileCategoriesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: categorySchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listFileCorrectionsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: fileCorrectionSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listFileEditionsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: fileDetailSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listFileMarkupsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: fileAssociationMarkupSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listFilesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: fileFullSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const changeFileCheckoutStatusOutputSchema = fileDetailSchema;
export const updateFileContentOutputSchema = fileDetailSchema;
