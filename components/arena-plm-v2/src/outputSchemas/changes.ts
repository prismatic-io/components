export const changeAlertSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    code: { type: "integer", format: "int32" },
  },
};
export const changeCompactSchema = {
  type: "object" as const,
  properties: {
    category: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
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
    effectiveDateTime: { type: "string", format: "date-time" },
    expirationDateTime: { type: "string", format: "date-time" },
    guid: { type: "string" },
    implementationStatus: {
      type: "string",
      enum: [
        "NOT_STARTED",
        "IN_PROGRESS",
        "NEEDS_ATTENTION",
        "DONE",
        "BLANK",
        "CANCELED",
      ],
    },
    lifecycleDateTime: { type: "string", format: "date-time" },
    lifecycleStatus: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: [
            "OPEN",
            "SUBMITTED_FOR_APPROVAL",
            "SUBMITTED",
            "APPROVED",
            "EFFECTIVE",
            "EXPIRED",
            "REJECTED",
            "OPEN_AND_UNLOCKED",
            "OPEN_AND_LOCKED",
            "SUBMITTED_FOR_ROUTING",
            "CANCELED",
            "COMPLETED",
          ],
        },
      },
    },
    number: { type: "string" },
    submissionDateTime: { type: "string", format: "date-time" },
    title: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
  },
};
export const changeFullSchema = {
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
    effectiveDateTime: { type: "string", format: "date-time" },
    effectivityType: {
      type: "string",
      enum: [
        "PERMANENT_ON_APPROVAL",
        "PERMANENT_ON_DATE",
        "TEMPORARY",
        "PERMANENT",
        "IMMEDIATE",
      ],
    },
    enforceApprovalDeadline: { type: "boolean" },
    guid: { type: "string" },
    lifecycleDateTime: { type: "string", format: "date-time" },
    lifecycleStatus: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: [
            "OPEN",
            "SUBMITTED_FOR_APPROVAL",
            "SUBMITTED",
            "APPROVED",
            "EFFECTIVE",
            "EXPIRED",
            "REJECTED",
            "OPEN_AND_UNLOCKED",
            "OPEN_AND_LOCKED",
            "SUBMITTED_FOR_ROUTING",
            "CANCELED",
            "COMPLETED",
          ],
        },
      },
    },
    number: { type: "string" },
    routingAdmins: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string" },
          fullName: { type: "string" },
          guid: { type: "string" },
        },
      },
    },
    routings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          guid: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    approvalDeadlineDateTime: { type: "string", format: "date-time" },
    canceledDateTime: { type: "string", format: "date-time" },
    effectivityPlannedDateTime: { type: "string", format: "date-time" },
    expirationDateTime: { type: "string", format: "date-time" },
    implementationStatus: {
      type: "string",
      enum: [
        "NOT_STARTED",
        "IN_PROGRESS",
        "NEEDS_ATTENTION",
        "DONE",
        "BLANK",
        "CANCELED",
      ],
    },
    implementationStatusDateTime: { type: "string", format: "date-time" },
    implementationStatusEditor: {
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
    withdrawnDateTime: { type: "string", format: "date-time" },
    submissionDateTime: { type: "string", format: "date-time" },
    deviated: { type: "boolean" },
    title: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
  },
};
export const changeHistorySchema = {
  type: "object" as const,
  properties: {
    rowNum: { type: "integer", format: "int64" },
    action: { type: "string" },
    property: { type: "string" },
    user: { type: "string" },
    originalValue: { type: "string" },
    newValue: { type: "string" },
    date: { type: "string" },
    guid: { type: "string" },
  },
};
export const changeImplementationNoteSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    label: { type: "string" },
    note: { type: "string" },
    private: { type: "boolean" },
  },
};
export const changeImplementationTaskSchema = {
  type: "object" as const,
  properties: {
    assignee: {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            email: { type: "string" },
            fullName: { type: "string" },
            guid: { type: "string" },
          },
        },
        userGroup: {
          type: "object",
          properties: { guid: { type: "string" }, name: { type: "string" } },
        },
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
    dueDate: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    status: { type: "string" },
  },
};
export const changeItemAssociationSchema = {
  type: "object" as const,
  properties: {
    affectedItemRevision: {
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
    bomView: {
      type: "object",
      properties: {
        includedInThisChange: { type: "boolean" },
        lockedByAnotherChange: { type: "boolean" },
        modifiedOnWorkingRev: { type: "boolean" },
        notes: { type: "string" },
      },
    },
    dispositionAttributes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          fieldType: { type: "string" },
          guid: { type: "string" },
          multiSelect: { type: "boolean" },
          name: { type: "string" },
          notes: { type: "string" },
          value: {},
        },
      },
    },
    filesView: {
      type: "object",
      properties: {
        includedInThisChange: { type: "boolean" },
        lockedByAnotherChange: { type: "boolean" },
        modifiedOnWorkingRev: { type: "boolean" },
        notes: { type: "string" },
      },
    },
    costingView: {
      type: "object",
      properties: {
        includedInThisChange: { type: "boolean" },
        lockedByAnotherChange: { type: "boolean" },
        modifiedOnWorkingRev: { type: "boolean" },
        notes: { type: "string" },
      },
    },
    guid: { type: "string" },
    materialEffectivityDateTime: { type: "string" },
    newItemRevision: {
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
    newLifecyclePhase: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    newRevisionNumber: { type: "string" },
    sourcingView: {
      type: "object",
      properties: {
        includedInThisChange: { type: "boolean" },
        lockedByAnotherChange: { type: "boolean" },
        modifiedOnWorkingRev: { type: "boolean" },
        notes: { type: "string" },
      },
    },
    specsView: {
      type: "object",
      properties: {
        includedInThisChange: { type: "boolean" },
        lockedByAnotherChange: { type: "boolean" },
        modifiedOnWorkingRev: { type: "boolean" },
        notes: { type: "string" },
      },
    },
  },
};
export const changeMarkupFileAssociationSchema = {
  type: "object" as const,
  properties: {
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
    change: {
      type: "object",
      properties: { guid: { type: "string" }, number: { type: "string" } },
    },
    request: {
      type: "object",
      properties: { guid: { type: "string" }, number: { type: "string" } },
    },
    guid: { type: "string" },
  },
};
export const changeRoutingMinimalSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
  },
};
export const deleteChangeFileAssociationOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    changeGuid: { type: "string" },
    changeFileAssociationGuid: { type: "string" },
  },
  required: ["success", "message", "changeGuid", "changeFileAssociationGuid"],
};
export const deleteChangeItemAssociationOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteChangeMarkupFileOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteChangeOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    changeGuid: { type: "string" },
    message: { type: "string" },
  },
  required: ["success", "changeGuid", "message"],
};
export const listChangeAlertsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeAlertSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeCategoryRoutingsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeRoutingMinimalSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeHistoryOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeHistorySchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeImplementationTaskNotesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeImplementationNoteSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeImplementationTasksOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeImplementationTaskSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeItemsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeItemAssociationSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangeMarkupFilesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeMarkupFileAssociationSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listChangesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: changeCompactSchema },
    count: { type: "integer", format: "int32" },
  },
};
