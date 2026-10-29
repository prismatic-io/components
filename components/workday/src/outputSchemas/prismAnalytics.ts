import { idDescriptorReferenceSchema } from "./shared";

export const tablePermissionsSchema = {
  type: "object" as const,
  properties: {
    canView: {
      type: "boolean",
    },
    canEdit: {
      type: "boolean",
    },
    canDelete: {
      type: "boolean",
    },
    canShare: {
      type: "boolean",
    },
    canPublish: {
      type: "boolean",
    },
    canAppendTableData: {
      type: "boolean",
    },
    canReplaceTableData: {
      type: "boolean",
    },
    canTruncateTableData: {
      type: "boolean",
    },
    canDeleteTableData: {
      type: "boolean",
    },
    canEditDataSourceSecurity: {
      type: "boolean",
    },
    selectTableData: {
      type: "boolean",
    },
  },
};

export const typeSchema = {
  type: "object" as const,
  properties: {
    name: {
      type: "string",
      enum: [
        "Boolean",
        "Numeric",
        "Text",
        "Date",
        "Instance",
        "Currency",
        "Multi_Instance",
      ],
    },
    id: {
      type: "string",
    },
  },
};

export const tableSchemaFieldsSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    ordinal: {
      type: "integer",
    },
    description: {
      type: "string",
    },
    parseFormat: {
      type: "string",
    },
    type: typeSchema,
    precision: {
      type: "integer",
    },
    scale: {
      type: "integer",
    },
    businessObject: idDescriptorReferenceSchema,
    context: idDescriptorReferenceSchema,
    displayName: {
      type: "string",
    },
    defaultValue: {
      type: "string",
    },
    fieldId: {
      type: "string",
    },
    required: {
      type: "boolean",
    },
    externalId: {
      type: "boolean",
    },
  },
};

export const tableStatsSchema = {
  type: "object" as const,
  properties: {
    rows: {
      type: "string",
    },
    size: {
      type: "string",
    },
  },
};

export const tagSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
};

export const userRefSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    fullName: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
  },
};

export const tableResponseSchema = {
  type: "object" as const,
  properties: {
    displayName: {
      type: "string",
    },
    description: {
      type: "string",
    },
    documentation: {
      type: "string",
    },
    enableForAnalysis: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    tags: {
      type: "array",
      items: tagSchema,
    },
    fields: {
      type: "array",
      items: tableSchemaFieldsSchema,
    },
    id: {
      type: "string",
    },
    empty: {
      type: "boolean",
    },
    published: {
      type: "boolean",
    },
    stats: tableStatsSchema,
    createdBy: userRefSchema,
    createdMoment: {
      type: "string",
    },
    updatedBy: userRefSchema,
    updatedMoment: {
      type: "string",
    },
    dateRefreshed: {
      type: "string",
    },
    tablePermissions: tablePermissionsSchema,
    analyticsDataSource: idDescriptorReferenceSchema,
  },
};

export const operationSchema = {
  type: "object" as const,
  properties: {
    operationType: {
      type: "string",
      enum: ["APPEND", "REPLACE", "DELETE", "UPDATE", "UPSERT"],
    },
    operationKeys: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export const sourceSchema = {
  type: "object" as const,
  properties: {
    sourceType: {
      type: "string",
      enum: ["UPLOAD", "TRANSFORMATION", "SFTP", "OMS", "S3", "SALESFORCE"],
    },
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
};

export const dataChangeSummarySchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    displayName: {
      type: "string",
    },
    source: sourceSchema,
    target: tagSchema,
    createdBy: userRefSchema,
    createdMoment: {
      type: "string",
    },
    modifiedBy: userRefSchema,
    modifiedMoment: {
      type: "string",
    },
    operation: operationSchema,
  },
};

export const fileUploadResponseSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    name: {
      type: "string",
    },
    checksum: {
      type: "string",
    },
    length: {
      type: "string",
    },
    state: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
        },
      },
    },
    allowedFileSize: {
      type: "string",
    },
  },
};

export const getDataChangesByIdOutputSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    displayName: {
      type: "string",
    },
    source: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        parms: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              fileNamePattern: {
                type: "string",
              },
              prompts: {
                type: "object" as const,
                properties: {
                  descriptor: {
                    type: "string",
                  },
                  doNotPromptAtRuntime: {
                    type: "boolean",
                  },
                  operator: idDescriptorReferenceSchema,
                  externalField: idDescriptorReferenceSchema,
                  promptQualifier: idDescriptorReferenceSchema,
                  externalParameter: idDescriptorReferenceSchema,
                  displayOptions: {
                    type: "array",
                    items: idDescriptorReferenceSchema,
                  },
                  xmlAlias: {
                    type: "string",
                  },
                  order: {
                    type: "string",
                  },
                  wqlAlias: {
                    type: "string",
                  },
                  label: {
                    type: "string",
                  },
                  dynamicValue: idDescriptorReferenceSchema,
                  xmlSchemaType: {
                    type: "string",
                  },
                  promptValue: {
                    type: "object" as const,
                    properties: {
                      attributeValue: {
                        type: "string",
                      },
                      workdataType: {
                        type: "object" as const,
                        properties: {
                          id: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                          descriptor: {
                            type: "string",
                          },
                        },
                      },
                      instanceValue: {
                        type: "array",
                        items: idDescriptorReferenceSchema,
                      },
                    },
                  },
                },
              },
              sqlQuery: {
                type: "string",
              },
            },
          },
        },
        sourceType: {
          type: "string",
          enum: ["UPLOAD", "TRANSFORMATION", "SFTP", "OMS", "S3", "SALESFORCE"],
        },
        schema: {
          type: "object" as const,
          properties: {
            fields: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  id: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  ordinal: {
                    type: "integer",
                  },
                  description: {
                    type: "string",
                  },
                  parseFormat: {
                    type: "string",
                  },
                  type: typeSchema,
                  precision: {
                    type: "integer",
                  },
                  scale: {
                    type: "integer",
                  },
                  businessObject: idDescriptorReferenceSchema,
                  context: idDescriptorReferenceSchema,
                },
              },
            },
            parseOptions: {
              type: "object" as const,
              properties: {
                type: {
                  type: "string",
                },
                charset: {
                  type: "string",
                },
                fieldsDelimitedBy: {
                  type: "string",
                },
                headerLinesToIgnore: {
                  type: "integer",
                },
                fieldsEnclosedBy: {
                  type: "string",
                },
                ignoreTrailingExtraFields: {
                  type: "boolean",
                },
                ignoreTrailingMissingFields: {
                  type: "boolean",
                },
                recordsDelimitedBy: {
                  type: "string",
                },
                ignoreTrailingWhitespaces: {
                  type: "boolean",
                },
                ignoreLeadingWhitespaces: {
                  type: "boolean",
                },
                fieldsEnclosingCharacterEscapedBy: {
                  type: "string",
                },
                ignoreTrailingWhitespacesInQuotes: {
                  type: "string",
                },
                ignoreLeadingWhitespacesInQuotes: {
                  type: "string",
                },
                commentCharacter: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    target: tagSchema,
    createdBy: userRefSchema,
    createdMoment: {
      type: "string",
    },
    modifiedBy: userRefSchema,
    modifiedMoment: {
      type: "string",
    },
    operation: operationSchema,
    mappings: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          sourceFieldName: {
            type: "string",
          },
          targetFieldName: {
            type: "string",
          },
        },
      },
    },
    errorMessage: {
      type: "string",
    },
    updatedBy: userRefSchema,
    updatedMoment: {
      type: "string",
    },
  },
};

export const getFilesByContainerIdOutputSchema = {
  type: "object" as const,
  properties: {
    total: {
      type: "integer",
    },
    data: {
      type: "array",
      items: fileUploadResponseSchema,
    },
  },
};

export const getTableByIdOutputSchema = tableResponseSchema;

export const listDataChangesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
    },
    data: {
      type: "array",
      items: dataChangeSummarySchema,
    },
  },
  items: dataChangeSummarySchema,
  required: [],
  additionalProperties: true,
};

export const listTablesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
    },
    data: {
      type: "array",
      items: tableResponseSchema,
    },
  },
  items: tableResponseSchema,
  required: [],
  additionalProperties: true,
};

export const postFileContainersOutputSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
  },
};

export const postFilesByContainerIdOutputSchema = fileUploadResponseSchema;

export const postTableOutputSchema = tableResponseSchema;

export const updateTableByIdOutputSchema = tableResponseSchema;
