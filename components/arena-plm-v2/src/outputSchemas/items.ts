export const changeItemLifecyclePhaseOutputSchema = {
  type: "object" as const,
  properties: {
    effectiveRevItem: {
      type: "object",
      properties: {
        guid: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    supersededRevItem: {
      type: "object",
      properties: {
        guid: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    workingRevItem: {
      type: "object",
      properties: {
        guid: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
  },
};
export const createItemImageOutputSchema = {
  type: "object" as const,
  properties: { guid: { type: "string" } },
};
export const deleteItemFileAssociationOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    itemGuid: { type: "string" },
    itemFileAssociationGuid: { type: "string" },
  },
  required: ["success", "message", "itemGuid", "itemFileAssociationGuid"],
};
export const deleteItemImageOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const deleteItemOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    itemGuid: { type: "string" },
    message: { type: "string" },
    statusCode: { type: "integer" },
  },
  required: ["success", "itemGuid", "message", "statusCode"],
};
export const getItemImageContentOutputSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    contentType: { type: "string" },
    size: { type: "integer" },
  },
  required: ["content", "contentType", "size"],
};
export const getItemNumberFormatByGuidOutputSchema = {
  type: "object" as const,
  properties: {
    active: { type: "boolean" },
    creationDateTime: { type: "string" },
    exampleNumber: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          apiName: { type: "string" },
          guid: { type: "string" },
          maxLength: { type: "integer", format: "int32" },
          maxSeqLength: { type: "integer", format: "int32" },
          name: { type: "string" },
          order: { type: "integer", format: "int32" },
          possibleValues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                description: { type: "string" },
              },
            },
          },
          preDefinedCodeList: {
            type: "object",
            properties: {
              nextValues: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    nextNumber: { type: "integer", format: "int32" },
                  },
                },
              },
            },
          },
          type: {
            type: "string",
            enum: ["FREE_TEXT", "DELIMITER", "VALUE_LIST", "AUTO_SEQUENCE"],
          },
          value: { type: "string" },
          zeroPadding: { type: "boolean" },
        },
      },
    },
  },
};
export const itemRevisionSchema = {
  type: "object" as const,
  properties: {
    change: {
      type: "object",
      properties: {
        effectiveDateTime: { type: "string" },
        deviated: { type: "boolean" },
        creationDateTime: { type: "string" },
        number: { type: "string" },
        guid: { type: "string" },
      },
    },
    guid: { type: "string" },
    lifecyclePhase: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    notes: { type: "string" },
    number: { type: "string" },
    revisionStatus: { type: "string" },
    status: { type: "integer", format: "int32" },
    supersededDateTime: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
  },
};
export const getItemRevisionsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemRevisionSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const itemComplianceSettingSchema = {
  type: "object" as const,
  properties: {
    defaultEvidenceType: { type: "string" },
    enabled: { type: "boolean" },
    evidenceLocation: {
      type: "object",
      properties: {
        allFileCategories: { type: "boolean" },
        fileCategories: {
          type: "array",
          items: {
            type: "object",
            properties: { guid: { type: "string" }, name: { type: "string" } },
          },
        },
      },
    },
    guid: { type: "string" },
    invalidationRule: { type: "string" },
    itemCategories: {
      type: "array",
      items: {
        type: "object",
        properties: { guid: { type: "string" }, name: { type: "string" } },
      },
    },
    name: { type: "string" },
    propagate: { type: "boolean" },
    rationaleHint: { type: "string" },
    statementOfRequirement: { type: "string" },
    type: { type: "string" },
  },
};
export const itemFileSchema = {
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
    guid: { type: "string" },
    latestEditionAssociation: { type: "boolean" },
    primary: { type: "boolean" },
  },
};
export const itemFullSchema = {
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
    assemblyType: {
      type: "string",
      enum: ["TOP_LEVEL_ASSEMBLY", "SUB_ASSEMBLY", "NOT_AN_ASSEMBLY"],
    },
    category: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    creationDateTime: { type: "string" },
    materialEffectivityDateTime: { type: "string" },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    description: { type: "string" },
    deviated: { type: "boolean" },
    effectiveDateTime: { type: "string" },
    guid: { type: "string" },
    inAssembly: { type: "boolean" },
    isAssembly: { type: "boolean" },
    lifecyclePhase: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    modifiedBom: { type: "boolean" },
    modifiedFiles: { type: "boolean" },
    modifiedSourcing: { type: "boolean" },
    modifiedSpecs: { type: "boolean" },
    name: { type: "string" },
    number: { type: "string" },
    offTheShelf: { type: "boolean" },
    owner: { type: "object", properties: { fullName: { type: "string" } } },
    procurementType: { type: "string", enum: ["OTS", "MTS"] },
    productionCost: { type: "number", format: "double" },
    prototypeCost: { type: "number", format: "double" },
    revisionNumber: { type: "string" },
    revisionStatus: {
      type: "string",
      enum: ["WORKING", "EFFECTIVE", "SUPERSEDED", "PENDING"],
    },
    shared: { type: "boolean" },
    standardCost: { type: "number", format: "double" },
    status: { type: "integer", format: "int32" },
    supersededDateTime: { type: "string" },
    targetCost: { type: "number", format: "double" },
    targetPrice: { type: "number", format: "double" },
    uom: { type: "string" },
    url: {
      type: "object",
      properties: { api: { type: "string" }, app: { type: "string" } },
    },
    onShape: {
      type: "object",
      properties: {
        mainUrl: { type: "string" },
        diffUrl: { type: "string" },
        cadPackageID: { type: "string" },
        onshape: { type: "boolean" },
        cadFileUrl: { type: "string" },
        drawingFileUrl: { type: "string" },
        drawingFileUrls: { type: "array", items: { type: "string" } },
        viewable3DFileUrl: { type: "string" },
        flatPatternFileUrl: { type: "string" },
      },
    },
    isLocked: { type: "boolean" },
  },
};
export const itemFutureChangeSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    change: {
      type: "object",
      properties: {
        creationDateTime: { type: "string" },
        effectivityType: { type: "string" },
        guid: { type: "string" },
        number: { type: "string" },
        title: { type: "string" },
      },
    },
  },
};
export const itemHistorySchema = {
  type: "object" as const,
  properties: {
    action: { type: "string" },
    date: { type: "string" },
    guid: { type: "string" },
    newValue: { type: "string" },
    originalValue: { type: "string" },
    property: { type: "string" },
    revision: { type: "string" },
    rowNum: { type: "integer", format: "int32" },
    user: { type: "string" },
  },
};
export const itemTrainingRecordSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    traningplan: {
      type: "object",
      properties: { guid: { type: "string" }, number: { type: "string" } },
    },
    signedDateTime: { type: "string" },
    dueDate: { type: "string" },
  },
};
export const itemWhereUsedSchema = {
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
    proceedOnNotice: { type: "boolean" },
    quantity: { type: "number", format: "double" },
    refDes: { type: "string" },
  },
};
export const listItemFileAssociationsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemFileSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemFutureChangesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemFutureChangeSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemHistoryOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemHistorySchema },
    count: { type: "integer", format: "int32" },
  },
};
export const numberFormatFieldFullSchema = {
  type: "object" as const,
  properties: {
    apiName: { type: "string" },
    guid: { type: "string" },
    maxLength: { type: "integer", format: "int32" },
    maxSeqLength: { type: "integer", format: "int32" },
    name: { type: "string" },
    order: { type: "integer", format: "int32" },
    possibleValues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    preDefinedCodeList: {
      type: "object",
      properties: {
        nextValues: {
          type: "array",
          items: {
            type: "object",
            properties: { nextNumber: { type: "integer", format: "int32" } },
          },
        },
      },
    },
    type: {
      type: "string",
      enum: ["FREE_TEXT", "DELIMITER", "VALUE_LIST", "AUTO_SEQUENCE"],
    },
    value: { type: "string" },
    zeroPadding: { type: "boolean" },
  },
};
export const listItemNumberFormatFieldsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: numberFormatFieldFullSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const numberFormatBasicInfoSchema = {
  type: "object" as const,
  properties: {
    active: { type: "boolean" },
    creationDateTime: { type: "string" },
    exampleNumber: { type: "string" },
    guid: { type: "string" },
    name: { type: "string" },
  },
};
export const listItemNumberFormatsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: numberFormatBasicInfoSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const numberReservationSchema = {
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
    guid: { type: "string" },
    itemNumbers: { type: "array", items: { type: "string" } },
    name: { type: "string" },
    numberFormat: {
      type: "object",
      properties: { guid: { type: "string" }, name: { type: "string" } },
    },
    quantity: { type: "integer", format: "int64" },
  },
};
export const listItemNumberReservationsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: numberReservationSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemRequirementsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemComplianceSettingSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemFullSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemTrainingRecordsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemTrainingRecordSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listItemWhereUsedOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: itemWhereUsedSchema },
    count: { type: "integer", format: "int32" },
  },
};
