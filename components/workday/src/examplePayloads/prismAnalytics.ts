export const listTablesExamplePayload = {
  data: {
    total: 0,
    data: [
      {
        displayName: "string",
        description: "string",
        documentation: "string",
        enableForAnalysis: false,
        name: "string",
        tags: [
          {
            id: "string",
            name: "string",
          },
        ],
        fields: [
          {
            id: "string",
            name: "string",
            ordinal: 0,
            description: "string",
            parseFormat: "string",
            type: {
              name: "Boolean",
              id: "Schema_Field_Type=Boolean",
            },
            precision: 0,
            scale: 0,
            businessObject: {
              id: "string",
              descriptor: "string",
            },
            context: {
              id: "string",
              descriptor: "string",
            },
            displayName: "string",
            defaultValue: "string",
            fieldId: "string",
            required: false,
            externalId: false,
          },
        ],
        id: "string",
        empty: false,
        published: false,
        stats: {
          rows: "string",
          size: "string",
        },
        createdBy: {
          id: "string",
          fullName: "string",
          descriptor: "string",
        },
        createdMoment: "string",
        updatedBy: {
          id: "string",
          fullName: "string",
          descriptor: "string",
        },
        updatedMoment: "string",
        dateRefreshed: "string",
        tablePermissions: {
          canView: false,
          canEdit: false,
          canDelete: false,
          canShare: false,
          canPublish: false,
          canAppendTableData: false,
          canReplaceTableData: false,
          canTruncateTableData: false,
          canDeleteTableData: false,
          canEditDataSourceSecurity: false,
          selectTableData: false,
        },
      },
    ],
  },
};

export const postTableExamplePayload = {
  data: {
    displayName: "string",
    description: "string",
    documentation: "string",
    enableForAnalysis: false,
    name: "string",
    tags: [
      {
        id: "string",
        name: "string",
      },
    ],
    fields: [
      {
        id: "string",
        name: "string",
        ordinal: 0,
        description: "string",
        parseFormat: "string",
        type: {
          name: "Boolean",
          id: "Schema_Field_Type=Boolean",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "string",
          descriptor: "string",
        },
        context: {
          id: "string",
          descriptor: "string",
        },
        displayName: "string",
        defaultValue: "string",
        fieldId: "string",
        required: false,
        externalId: false,
      },
    ],
    id: "string",
    empty: false,
    published: false,
    stats: {
      rows: "string",
      size: "string",
    },
    createdBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    createdMoment: "string",
    updatedBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    updatedMoment: "string",
    dateRefreshed: "string",
    tablePermissions: {
      canView: false,
      canEdit: false,
      canDelete: false,
      canShare: false,
      canPublish: false,
      canAppendTableData: false,
      canReplaceTableData: false,
      canTruncateTableData: false,
      canDeleteTableData: false,
      canEditDataSourceSecurity: false,
      selectTableData: false,
    },
  },
};

export const getTableByIdExamplePayload = {
  data: {
    displayName: "string",
    description: "string",
    documentation: "string",
    enableForAnalysis: false,
    name: "string",
    tags: [
      {
        id: "string",
        name: "string",
      },
    ],
    fields: [
      {
        id: "string",
        name: "string",
        ordinal: 0,
        description: "string",
        parseFormat: "string",
        type: {
          name: "Boolean",
          id: "Schema_Field_Type=Boolean",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "string",
          descriptor: "string",
        },
        context: {
          id: "string",
          descriptor: "string",
        },
        displayName: "string",
        defaultValue: "string",
        fieldId: "string",
        required: false,
        externalId: false,
      },
    ],
    id: "string",
    empty: false,
    published: false,
    stats: {
      rows: "string",
      size: "string",
    },
    createdBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    createdMoment: "string",
    updatedBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    updatedMoment: "string",
    dateRefreshed: "string",
    tablePermissions: {
      canView: false,
      canEdit: false,
      canDelete: false,
      canShare: false,
      canPublish: false,
      canAppendTableData: false,
      canReplaceTableData: false,
      canTruncateTableData: false,
      canDeleteTableData: false,
      canEditDataSourceSecurity: false,
      selectTableData: false,
    },
  },
};

export const updateTableByIdExamplePayload = postTableExamplePayload;

export const listDataChangesExamplePayload = {
  data: {
    total: 0,
    data: [
      {
        id: "string",
        name: "string",
        displayName: "string",
        source: {
          sourceType: "UPLOAD",
          id: "string",
          name: "string",
        },
        target: {
          id: "string",
          name: "string",
        },
        createdBy: {
          id: "string",
          fullName: "string",
          descriptor: "string",
        },
        createdMoment: "string",
        modifiedBy: {
          id: "string",
          fullName: "string",
          descriptor: "string",
        },
        modifiedMoment: "string",
        operation: {
          operationType: "APPEND",
          operationKeys: ["string"],
        },
      },
    ],
  },
};

export const getDataChangesByIdExamplePayload = {
  data: {
    id: "string",
    name: "string",
    displayName: "string",
    source: {
      sourceType: "UPLOAD",
      id: "string",
      name: "string",
      parms: [
        {
          fileNamePattern: "string",
          prompts: {
            descriptor: "string",
            doNotPromptAtRuntime: false,
            operator: {
              id: "string",
              descriptor: "string",
            },
            externalField: {
              id: "string",
              descriptor: "string",
            },
            promptQualifier: {
              id: "string",
              descriptor: "string",
            },
            externalParameter: {
              id: "string",
              descriptor: "string",
            },
            displayOptions: [
              {
                id: "string",
                descriptor: "string",
              },
            ],
            xmlAlias: "string",
            order: "string",
            wqlAlias: "string",
            label: "string",
            dynamicValue: {
              id: "string",
              descriptor: "string",
            },
            xmlSchemaType: "string",
            promptValue: {
              attributeValue: "string",
              workdataType: {
                id: "string",
                type: "string",
                descriptor: "string",
              },
              instanceValue: [
                {
                  id: "string",
                  descriptor: "string",
                },
              ],
            },
          },
        },
      ],
      schema: {
        fields: [
          {
            id: "string",
            name: "string",
            ordinal: 0,
            description: "string",
            parseFormat: "string",
            type: {
              name: "Boolean",
              id: "Schema_Field_Type=Boolean",
            },
            precision: 0,
            scale: 0,
            businessObject: {
              id: "string",
              descriptor: "string",
            },
            context: {
              id: "string",
              descriptor: "string",
            },
          },
        ],
        parseOptions: {
          type: "string",
          charset: "string",
          fieldsDelimitedBy: "string",
          headerLinesToIgnore: 0,
          fieldsEnclosedBy: "string",
          ignoreTrailingExtraFields: false,
          ignoreTrailingMissingFields: false,
          recordsDelimitedBy: "string",
          ignoreTrailingWhitespaces: false,
          ignoreLeadingWhitespaces: false,
          fieldsEnclosingCharacterEscapedBy: "string",
          ignoreTrailingWhitespacesInQuotes: "string",
          ignoreLeadingWhitespacesInQuotes: "string",
          commentCharacter: "string",
        },
      },
    },
    target: {
      id: "string",
      name: "string",
    },
    createdBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    createdMoment: "string",
    modifiedBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    modifiedMoment: "string",
    operation: {
      operationType: "APPEND",
      operationKeys: ["string"],
    },
    mappings: [
      {
        sourceFieldName: "string",
        targetFieldName: "string",
      },
    ],
    errorMessage: "string",
    updatedBy: {
      id: "string",
      fullName: "string",
      descriptor: "string",
    },
    updatedMoment: "string",
  },
};

export const postFileContainersExamplePayload = {
  data: {
    id: "string",
  },
};

export const getFilesByContainerIdExamplePayload = {
  data: {
    total: 0,
    data: [
      {
        id: "string",
        descriptor: "string",
        name: "string",
        checksum: "string",
        length: "string",
        state: {
          id: "string",
        },
        allowedFileSize: "string",
      },
    ],
  },
};

export const postFilesByContainerIdExamplePayload = {
  data: {
    id: "string",
    descriptor: "string",
    name: "string",
    checksum: "string",
    length: "string",
    state: {
      id: "string",
    },
    allowedFileSize: "string",
  },
};
