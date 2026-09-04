import { numberSequenceCompactSchema } from "./shared";
export const changeRequestStatusOutputSchema = {
  type: "object" as const,
  properties: {
    comment: { type: "string" },
    request: {
      type: "object",
      properties: { guid: { type: "string" }, number: { type: "string" } },
    },
    status: { type: "string" },
  },
};
export const deleteRequestMarkupFileOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteRequestOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const evaluatorGroupCompactSchema = {
  type: "object" as const,
  properties: { guid: { type: "string" }, name: { type: "string" } },
};
export const requestIssueResponseSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    response: { type: "string" },
    responseUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    correctionUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    correctionDateTime: { type: "string" },
    responseDateTime: { type: "string" },
  },
};
export const listEvaluationIssueResponsesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: requestIssueResponseSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const requestIssueSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    issue: { type: "string" },
    supplierVisibility: { type: "boolean" },
    issueUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    issueDateTime: { type: "string" },
    status: { type: "string" },
    correctionUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    correctionDateTime: { type: "string" },
    number: { type: "integer", format: "int32" },
    numberResponses: { type: "integer", format: "int32" },
  },
};
export const listRequestEvaluationIssuesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: requestIssueSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listRequestEvaluatorGroupsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: evaluatorGroupCompactSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const requestItemSchema = {
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
  },
};
export const listRequestItemsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: requestItemSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const requestMarkupSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    markup: {
      type: "object",
      properties: {
        category: {
          type: "object",
          properties: {
            guid: { type: "string" },
            name: { type: "string" },
            path: { type: "string" },
          },
        },
        author: {
          type: "object",
          properties: {
            email: { type: "string" },
            fullName: { type: "string" },
            guid: { type: "string" },
          },
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
        guid: { type: "string" },
        number: { type: "string" },
        edition: { type: "string" },
        author: {
          type: "object",
          properties: { fullName: { type: "string" } },
        },
      },
    },
    reserved: { type: "boolean" },
  },
};
export const listRequestMarkupFilesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: requestMarkupSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listRequestNumberSequencesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: numberSequenceCompactSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const requestShortSchema = {
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
    category: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        path: { type: "string" },
      },
    },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    submitter: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    evaluatorGroup: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    number: { type: "string" },
    title: { type: "string" },
    deferralCode: { type: "string" },
    deferDeadlineDateTime: { type: "string" },
    problem: { type: "string" },
    requestCode: { type: "string" },
    requestedAction: { type: "string" },
    resolutionCode: { type: "string" },
    lifecycleDateTime: { type: "string" },
    dispositionType: { type: "string" },
    submissionDateTime: { type: "string" },
    lifecycleStatus: {
      type: "string",
      enum: ["UNSUBMITTED", "SUBMITTED", "PROMOTED", "CLOSED", "DEFERRED"],
    },
    guid: { type: "string" },
  },
};
export const listRequestsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: requestShortSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const removeFileFromRequestOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
