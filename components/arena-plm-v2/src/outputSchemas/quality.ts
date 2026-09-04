import { numberSequenceCompactSchema } from "./shared";
export const workflowDecisionResponseSchema = {
  type: "object" as const,
  properties: {
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    proxyFor: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    group: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    comments: { type: "string" },
    decision: {
      type: "string",
      enum: [
        "APPROVED",
        "REJECTED",
        "OVERRIDE_APPROVED",
        "OVERRIDE_REJECTED",
        "OVERRIDE_CANCEL",
        "COMMENTED",
        "NA",
      ],
    },
    decisionDateTime: { type: "string", format: "date-time" },
    decisionType: {
      type: "string",
      enum: ["ALL_REQUIRED", "ONE_REQUIRED", "OPTIONAL", "COMMENTS_ONLY"],
    },
    guid: { type: "string" },
  },
};
export const addQualityStepApproverOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: workflowDecisionResponseSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const attributeGroupFullSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    guid: { type: "string" },
    attributes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          attribute: {
            type: "object",
            properties: {
              name: { type: "string" },
              custom: { type: "boolean" },
              guid: { type: "string" },
            },
          },
          hideByDefault: { type: "boolean" },
          order: { type: "integer", format: "int32" },
        },
      },
    },
    visibilityRules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          drivingAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    custom: { type: "boolean" },
                    guid: { type: "string" },
                  },
                },
                value: {},
              },
            },
          },
          order: { type: "integer", format: "int32" },
          action: { type: "string" },
          dependentAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                custom: { type: "boolean" },
                guid: { type: "string" },
              },
            },
          },
        },
      },
    },
    cascadingRules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          drivingAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    custom: { type: "boolean" },
                    guid: { type: "string" },
                  },
                },
                value: {},
              },
            },
          },
          order: { type: "integer", format: "int32" },
          dependentAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    custom: { type: "boolean" },
                    guid: { type: "string" },
                  },
                },
                values: {},
              },
            },
          },
        },
      },
    },
    conditionallyRequiredRules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          drivingAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    custom: { type: "boolean" },
                    guid: { type: "string" },
                  },
                },
                value: {},
              },
            },
          },
          order: { type: "integer", format: "int32" },
          required: { type: "boolean" },
          dependentAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    custom: { type: "boolean" },
                    guid: { type: "string" },
                  },
                },
                defaultValue: {},
              },
            },
          },
        },
      },
    },
  },
};
export const changeQualityProcessStatusOutputSchema = {
  type: "object" as const,
  properties: {
    qualityProcess: {
      type: "object",
      properties: {
        canceledDateTime: { type: "string" },
        completedDateTime: { type: "string" },
        creationDateTime: { type: "string" },
        creator: {
          type: "object",
          properties: {
            email: { type: "string" },
            fullName: { type: "string" },
            guid: { type: "string" },
          },
        },
        currentStep: {
          type: "object",
          properties: { guid: { type: "string" }, name: { type: "string" } },
        },
        description: { type: "string" },
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        owner: {
          type: "object",
          properties: {
            email: { type: "string" },
            fullName: { type: "string" },
            guid: { type: "string" },
          },
        },
        qualityProcessNotes: { type: "string" },
        status: { type: "string" },
        statusComments: { type: "string" },
        statusMode: { type: "string" },
        targetCompletionDateTime: { type: "string" },
        template: {
          type: "object",
          properties: { active: { type: "boolean" }, guid: { type: "string" } },
        },
        type: { type: "string" },
        targetDateComments: { type: "string" },
      },
    },
    complete: { type: "boolean" },
    comment: { type: "string" },
    status: { type: "string" },
  },
};
export const deleteQualityProcessOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteQualityProcessStepAffectedOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const listQualityProcessNumberFormatsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: numberSequenceCompactSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listQualityProcessOwnersOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          guid: { type: "string" },
          fullName: { type: "string" },
          email: { type: "string" },
        },
      },
    },
    count: { type: "integer" },
  },
};
export const qualityAffectedSchema = {
  type: "object" as const,
  properties: {
    addedAfterCompletion: { type: "boolean" },
    addedBy: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    addedDateTime: { type: "string" },
    affected: {
      type: "object",
      properties: {
        guid: { type: "string" },
        specificRevision: { type: "boolean" },
        type: { type: "string" },
      },
    },
    guid: { type: "string" },
    notes: { type: "string" },
  },
};
export const listQualityProcessStepAffectedOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: qualityAffectedSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const qualityProcessStepSchema = {
  type: "object" as const,
  properties: {
    allowOwnerToAddApprovers: { type: "boolean" },
    approvals: {
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
    assignee: {
      type: "object",
      properties: {
        deprecated: { type: "boolean" },
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
        note: { type: "string" },
      },
    },
    attributes: {
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
    assignees: {
      type: "object",
      properties: {
        users: {
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
        userGroups: {
          type: "array",
          items: {
            type: "object",
            properties: {
              guid: { type: "string" },
              name: { type: "string" },
              users: {
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
            },
          },
        },
      },
    },
    canceledDateTime: { type: "string" },
    canceledUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    completeDateTime: { type: "string" },
    completeUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    dueDateTime: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    order: { type: "integer", format: "int32" },
    status: { type: "string" },
    type: { type: "string" },
    stepAssignComment: { type: "string" },
    firstOpened: { type: "string" },
    required: { type: "string" },
    reopenUser: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    reopenedDate: { type: "string" },
  },
};
export const listQualityProcessStepsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: qualityProcessStepSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listQualityProcessTemplateAttributeGroupsOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "integer", format: "int32" },
    results: { type: "array", items: attributeGroupFullSchema },
  },
};
export const listQualityProcessTemplateAttributesOutputSchema = {
  type: "object" as const,
  properties: {
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          attributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                allowsExplicitNullValue: { type: "boolean" },
                allowLowerCase: { type: "boolean" },
                allowNegatives: { type: "boolean" },
                allowNumbers: { type: "boolean" },
                allowUpperCase: { type: "boolean" },
                costCalculation: {
                  type: "string",
                  enum: ["ENTERED", "ROLLUP", "ROLLUP_AND_ENTERED"],
                },
                currency: {
                  type: "string",
                  enum: [
                    "USD",
                    "EUR",
                    "GBP",
                    "YEN",
                    "AUD",
                    "CAD",
                    "CNY",
                    "INR",
                    "JPY",
                    "KRW",
                    "NZD",
                    "SEK",
                    "DKK",
                    "NOK",
                  ],
                },
                decimalPlaces: { type: "integer", format: "int32" },
                defaultValue: {},
                deprecated: { type: "boolean" },
                description: { type: "string" },
                developerNotes: { type: "string" },
                example: { type: "string" },
                excludedValues: { type: "array", items: { type: "string" } },
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
                inViews: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "EMPTY_VIEW",
                      "ITEM_SPECS",
                      "ITEM_BOM",
                      "ITEM_WHEREUSED",
                      "ITEM_SOURCING",
                      "ITEM_COSTING",
                      "ITEM_FILES",
                      "ITEM_COMPLIANCE",
                      "ITEM_REVISIONS",
                      "ITEM_NOTIFICATIONS",
                      "ITEM_SUPPLIER_ACCESS",
                      "ITEM_PROJECTS",
                      "ITEM_QUALITY",
                      "ITEM_CUSTOM",
                      "ITEM_CUSTOM_NON_REV",
                      "ITEM_TRAINING",
                      "ITEM_TRAINING_PLANS",
                      "ITEM_TRAINING_RECORDS",
                      "ITEM_TRAINING_QUIZ",
                      "ITEM_TRAINING_QUIZ_HISTORY",
                      "ITEM_VERIFY",
                      "ITEM_REFERENCES",
                      "REQUEST_SUMMARY",
                      "REQUEST_FILES",
                      "REQUEST_ITEMS",
                      "REQUEST_PARTICIPANTS",
                      "REQUEST_EVALUATION",
                      "REQUEST_CHANGES",
                      "REQUEST_STATUS",
                      "REQUEST_RECENT_ACTIVITY",
                      "REQUEST_PROJECTS",
                      "REQUEST_QUALITY",
                      "REQUEST_CUSTOM",
                      "CHANGE_SUMMARY",
                      "CHANGE_FILES",
                      "CHANGE_ITEMS",
                      "CHANGE_REQUESTS",
                      "CHANGE_APPROVAL_ROUTINGS",
                      "CHANGE_APPROVAL_DECISIONS",
                      "CHANGE_IMPLEMENTATION",
                      "CHANGE_ALERTS",
                      "CHANGE_NOTIFICATIONS",
                      "CHANGE_STATUS",
                      "CHANGE_PROJECTS",
                      "CHANGE_QUALITY",
                      "CHANGE_SUPPLIER_ACCESS",
                      "CHANGE_CUSTOM",
                      "CHANGE_VERIFY",
                      "SUPPLIER_PROFILE",
                      "SUPPLIER_CONTACTS",
                      "SUPPLIER_SUPPLIER_ITEMS",
                      "SUPPLIER_SOURCING_LINES",
                      "SUPPLIER_SOURCED_ITEMS",
                      "SUPPLIER_FILES",
                      "SUPPLIER_QUALITY",
                      "SUPPLIER_CUSTOM",
                      "SUPPLIER_ITEMS_QUALITY",
                      "SI_SPECS",
                      "SI_SOURCING_LINES",
                      "SI_QUOTES",
                      "SI_PURCHASES",
                      "SI_FILES",
                      "SI_COMPLIANCE",
                      "SI_LOOKUP",
                      "SI_CUSTOM",
                      "FILE_SUMMARY",
                      "FILE_ASSOCIATIONS",
                      "FILE_EDITIONS",
                      "FILE_MARKUPS",
                      "FILE_RECENT_ACTIVITY",
                      "FILE_PROJECTS",
                      "FILE_QUALITY",
                      "PROJECT_SUMMARY",
                      "PROJECT_SCHEDULE",
                      "PROJECT_REFERENCES",
                      "PROJECT_QUALITY",
                      "QUALITY_SUMMARY",
                      "QUALITY_DETAILS",
                      "QUALITY_AFFECTED",
                      "QUALITY_PROJECTS",
                      "QUALITY_SUPPLIER_ACCESS",
                      "QUALITY_HISTORY",
                      "TRAINING_SUMMARY",
                      "TRAINING_ITEMS",
                      "TRAINING_RECORDS",
                      "TRAINING_USERS",
                      "TRAINING_HISTORY",
                      "TRAINING_PROGRESS",
                      "REQUIREMENT_SUMMARY",
                      "REQUIREMENT_TREE",
                      "REQUIREMENT_TRACE",
                      "REQUIREMENT_REFERENCES",
                      "REQUIREMENT_FILES",
                      "REQUIREMENT_HISTORY",
                      "REQUIREMENT_BASELINES",
                      "EXPORT_SUMMARY",
                      "VERIFY_SUMMARY",
                      "VERIFY_FILES",
                      "VERIFY_REFERENCES",
                      "VERIFY_HISTORY",
                    ],
                  },
                  uniqueItems: true,
                },
                maskingValue: {},
                maxLength: { type: "integer", format: "int32" },
                maxSelections: { type: "integer", format: "int32" },
                maxValue: { type: "number", format: "double" },
                name: { type: "string" },
                possibleValues: { type: "array", items: {} },
                propertyId: { type: "integer", format: "int64" },
                revisionControlled: { type: "boolean" },
                guid: { type: "string" },
                global: { type: "boolean" },
                active: { type: "boolean" },
                visibleWhenBlank: { type: "boolean" },
                creatable: { type: "boolean" },
                editable: { type: "boolean" },
                required: { type: "boolean" },
                apiName: { type: "string" },
                private: { type: "boolean" },
                custom: { type: "boolean" },
                deleted: { type: "boolean" },
                multiSelect: { type: "boolean" },
                searchable: { type: "boolean" },
                revisionType: { type: "string" },
              },
              required: ["required"],
            },
          },
          guid: { type: "string" },
          name: { type: "string" },
          order: { type: "integer", format: "int32" },
        },
      },
    },
  },
};
export const qualityTemplateSchema = {
  type: "object" as const,
  properties: {
    active: { type: "boolean" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    defaultNumberFormat: {
      type: "object",
      properties: { guid: { type: "string" } },
    },
    defaultOwner: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    description: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    numberFormats: {
      type: "object",
      properties: {
        guid: { type: "string" },
        lastUsed: { type: "string" },
        name: { type: "string" },
        nextValue: { type: "string" },
        prefixes: {
          type: "array",
          items: {
            type: "object",
            properties: { guid: { type: "string" }, value: { type: "string" } },
          },
        },
      },
    },
    shortName: { type: "string" },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          defaultAssignees: {
            type: "object",
            properties: {
              userGroups: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    guid: { type: "string" },
                    name: { type: "string" },
                    users: {
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
                  },
                },
              },
              users: {
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
            },
          },
          defaultApprovers: {
            type: "object",
            properties: {
              userGroups: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    guid: { type: "string" },
                    name: { type: "string" },
                    users: {
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
                  },
                },
              },
              users: {
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
            },
          },
          approvers: {
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
          attributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                guid: { type: "string" },
                active: { type: "boolean" },
                allowLowerCase: { type: "boolean" },
                allowNegatives: { type: "boolean" },
                allowUpperCase: { type: "boolean" },
                allowsExplicitNullValue: { type: "boolean" },
                creatable: { type: "boolean" },
                custom: { type: "boolean" },
                deleted: { type: "boolean" },
                deprecated: { type: "boolean" },
                editable: { type: "boolean" },
                global: { type: "boolean" },
                apiName: { type: "string" },
                costCalculation: {
                  type: "string",
                  enum: ["ENTERED", "ROLLUP", "ROLLUP_AND_ENTERED"],
                },
                currency: {
                  type: "string",
                  enum: [
                    "USD",
                    "EUR",
                    "GBP",
                    "YEN",
                    "AUD",
                    "CAD",
                    "CNY",
                    "INR",
                    "JPY",
                    "KRW",
                    "NZD",
                    "SEK",
                    "DKK",
                    "NOK",
                  ],
                },
                decimalPlaces: { type: "integer", format: "int32" },
                defaultValue: {},
                developerNotes: { type: "string" },
                description: { type: "string" },
                example: { type: "string" },
                excludedValues: { type: "array", items: { type: "string" } },
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
                inViews: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "EMPTY_VIEW",
                      "ITEM_SPECS",
                      "ITEM_BOM",
                      "ITEM_WHEREUSED",
                      "ITEM_SOURCING",
                      "ITEM_COSTING",
                      "ITEM_FILES",
                      "ITEM_COMPLIANCE",
                      "ITEM_REVISIONS",
                      "ITEM_NOTIFICATIONS",
                      "ITEM_SUPPLIER_ACCESS",
                      "ITEM_PROJECTS",
                      "ITEM_QUALITY",
                      "ITEM_CUSTOM",
                      "ITEM_CUSTOM_NON_REV",
                      "ITEM_TRAINING",
                      "ITEM_TRAINING_PLANS",
                      "ITEM_TRAINING_RECORDS",
                      "ITEM_TRAINING_QUIZ",
                      "ITEM_TRAINING_QUIZ_HISTORY",
                      "ITEM_VERIFY",
                      "ITEM_REFERENCES",
                      "REQUEST_SUMMARY",
                      "REQUEST_FILES",
                      "REQUEST_ITEMS",
                      "REQUEST_PARTICIPANTS",
                      "REQUEST_EVALUATION",
                      "REQUEST_CHANGES",
                      "REQUEST_STATUS",
                      "REQUEST_RECENT_ACTIVITY",
                      "REQUEST_PROJECTS",
                      "REQUEST_QUALITY",
                      "REQUEST_CUSTOM",
                      "CHANGE_SUMMARY",
                      "CHANGE_FILES",
                      "CHANGE_ITEMS",
                      "CHANGE_REQUESTS",
                      "CHANGE_APPROVAL_ROUTINGS",
                      "CHANGE_APPROVAL_DECISIONS",
                      "CHANGE_IMPLEMENTATION",
                      "CHANGE_ALERTS",
                      "CHANGE_NOTIFICATIONS",
                      "CHANGE_STATUS",
                      "CHANGE_PROJECTS",
                      "CHANGE_QUALITY",
                      "CHANGE_SUPPLIER_ACCESS",
                      "CHANGE_CUSTOM",
                      "CHANGE_VERIFY",
                      "SUPPLIER_PROFILE",
                      "SUPPLIER_CONTACTS",
                      "SUPPLIER_SUPPLIER_ITEMS",
                      "SUPPLIER_SOURCING_LINES",
                      "SUPPLIER_SOURCED_ITEMS",
                      "SUPPLIER_FILES",
                      "SUPPLIER_QUALITY",
                      "SUPPLIER_CUSTOM",
                      "SUPPLIER_ITEMS_QUALITY",
                      "SI_SPECS",
                      "SI_SOURCING_LINES",
                      "SI_QUOTES",
                      "SI_PURCHASES",
                      "SI_FILES",
                      "SI_COMPLIANCE",
                      "SI_LOOKUP",
                      "SI_CUSTOM",
                      "FILE_SUMMARY",
                      "FILE_ASSOCIATIONS",
                      "FILE_EDITIONS",
                      "FILE_MARKUPS",
                      "FILE_RECENT_ACTIVITY",
                      "FILE_PROJECTS",
                      "FILE_QUALITY",
                      "PROJECT_SUMMARY",
                      "PROJECT_SCHEDULE",
                      "PROJECT_REFERENCES",
                      "PROJECT_QUALITY",
                      "QUALITY_SUMMARY",
                      "QUALITY_DETAILS",
                      "QUALITY_AFFECTED",
                      "QUALITY_PROJECTS",
                      "QUALITY_SUPPLIER_ACCESS",
                      "QUALITY_HISTORY",
                      "TRAINING_SUMMARY",
                      "TRAINING_ITEMS",
                      "TRAINING_RECORDS",
                      "TRAINING_USERS",
                      "TRAINING_HISTORY",
                      "TRAINING_PROGRESS",
                      "REQUIREMENT_SUMMARY",
                      "REQUIREMENT_TREE",
                      "REQUIREMENT_TRACE",
                      "REQUIREMENT_REFERENCES",
                      "REQUIREMENT_FILES",
                      "REQUIREMENT_HISTORY",
                      "REQUIREMENT_BASELINES",
                      "EXPORT_SUMMARY",
                      "VERIFY_SUMMARY",
                      "VERIFY_FILES",
                      "VERIFY_REFERENCES",
                      "VERIFY_HISTORY",
                    ],
                  },
                  uniqueItems: true,
                },
                maskingValue: {},
                maxLength: { type: "integer", format: "int32" },
                maxSelections: { type: "integer", format: "int32" },
                maxValue: { type: "number", format: "double" },
                multiSelect: { type: "boolean" },
                name: { type: "string" },
                possibleValues: { type: "array", items: {} },
                required: { type: "boolean" },
                revisionControlled: { type: "boolean" },
                searchable: { type: "boolean" },
                visibleWhenBlank: { type: "boolean" },
                revisionType: {
                  type: "string",
                  enum: [
                    "NON_REVISION_CONTROLLED",
                    "REVISION_SPECIFIC",
                    "REVISION_CONTROLLED",
                  ],
                },
                private: { type: "boolean" },
              },
            },
          },
          description: { type: "string" },
          guid: { type: "string" },
          name: { type: "string" },
          order: { type: "integer", format: "int32" },
          type: { type: "string" },
          updateAffectedAfterClosure: { type: "boolean" },
          allowOwnerToAddApprovers: { type: "boolean" },
        },
      },
    },
    supplierCreatorSetting: { type: "boolean" },
    supplierStepAssignSetting: { type: "boolean" },
    stepSequencing: {
      type: "string",
      enum: ["NO_SEQUENCING", "COMPLETE_ONLY", "COMPLETE_AND_EDIT"],
    },
  },
};
export const listQualityProcessTemplatesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: qualityTemplateSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const workflowDecisionFullSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    creationDateTime: { type: "string" },
    decisionType: {
      type: "string",
      enum: ["ALL_REQUIRED", "ONE_REQUIRED", "OPTIONAL", "COMMENTS_ONLY"],
    },
    user: {
      type: "object",
      properties: {
        guid: { type: "string" },
        creationDateTime: { type: "string" },
        fullName: { type: "string" },
        email: { type: "string" },
      },
    },
    decision: {
      type: "string",
      enum: [
        "APPROVED",
        "REJECTED",
        "OVERRIDE_APPROVED",
        "OVERRIDE_REJECTED",
        "OVERRIDE_CANCEL",
        "COMMENTED",
        "NA",
      ],
    },
    decisionDateTime: { type: "string", format: "date-time" },
    comments: { type: "string" },
    group: {
      type: "object",
      properties: {
        guid: { type: "string" },
        creationDateTime: { type: "string" },
        name: { type: "string" },
      },
    },
    proxyFor: {
      type: "object",
      properties: {
        guid: { type: "string" },
        creationDateTime: { type: "string" },
        fullName: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};
export const listQualityStepDecisionsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: workflowDecisionFullSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const qualityProcessVoFullResultSchema = {
  type: "object" as const,
  properties: {
    canceledDateTime: { type: "string" },
    completedDateTime: { type: "string" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    currentStep: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    description: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    number: { type: "string" },
    owner: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    qualityProcessNotes: { type: "string" },
    status: { type: "string" },
    statusComments: { type: "string" },
    sequenceMode: { type: "string" },
    targetCompletionDateTime: { type: "string" },
    template: {
      type: "object",
      properties: { active: { type: "boolean" }, guid: { type: "string" } },
    },
    type: { type: "string" },
    targetDateComments: { type: "string" },
  },
};
export const qualityProcessListSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: qualityProcessVoFullResultSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const qualityProcessSchema = {
  type: "object" as const,
  properties: {
    canceledDateTime: { type: "string" },
    completedDateTime: { type: "string" },
    creationDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    currentStep: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    description: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    number: { type: "string" },
    owner: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    qualityProcessNotes: { type: "string" },
    status: { type: "string" },
    statusComments: { type: "string" },
    statusMode: { type: "string" },
    targetCompletionDateTime: { type: "string" },
    template: {
      type: "object",
      properties: { active: { type: "boolean" }, guid: { type: "string" } },
    },
    type: { type: "string" },
    targetDateComments: { type: "string" },
  },
};
