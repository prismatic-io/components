import { verifyTemplateSchema } from "./shared";
export const deleteTicketOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const ticketFileSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
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
    latestEditionAssociation: { type: "boolean" },
  },
};
export const listTicketFilesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: ticketFileSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const ticketItemSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revision: { type: "string" },
        revisionStatus: { type: "string" },
      },
    },
  },
};
export const listTicketItemsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: ticketItemSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const ticketSchema = {
  type: "object" as const,
  properties: {
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
    assignee: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    creationDateTime: { type: "string" },
    description: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    fixVersion: { type: "string" },
    foundOn: { type: "string" },
    guid: { type: "string" },
    modifyDateTime: { type: "string" },
    title: { type: "string" },
    number: { type: "string" },
    priority: { type: "string" },
    status: {
      type: "object",
      properties: { guid: { type: "string" }, value: { type: "string" } },
    },
    template: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
  },
};
export const listTicketsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: ticketSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listTicketTemplatesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: verifyTemplateSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const removeTicketChangeOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeTicketFileOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeTicketItemOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeTicketQualityProcessOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeTicketReferenceOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
