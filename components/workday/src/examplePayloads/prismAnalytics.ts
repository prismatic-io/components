export const listTablesExamplePayload = {
  data: {
    total: 1,
    data: [
      {
        displayName: "Employee Compensation",
        description: "Monthly compensation data for all workers",
        documentation: "Reference table for compensation analysis",
        enableForAnalysis: false,
        name: "Employee_Compensation",
        tags: [
          {
            id: "3aa5550b7fe348b98d7b5741afc65534",
            name: "Finance",
          },
        ],
        fields: [
          {
            id: "0e44c92412d34b01ace61e80a47aaf6d",
            name: "employee_id",
            ordinal: 0,
            description: "Worker identifier",
            parseFormat: "yyyy-MM-dd",
            type: {
              name: "Boolean",
              id: "Schema_Field_Type=Boolean",
            },
            precision: 0,
            scale: 0,
            businessObject: {
              id: "cc67c47133894e099a5f1c0aa88efc47",
              descriptor: "Worker",
            },
            context: {
              id: "51c4a636bcbc4331b921a1e37b18f6f0",
              descriptor: "Worker",
            },
            displayName: "Employee ID",
            defaultValue: "0",
            fieldId: "employee_id",
            required: false,
            externalId: false,
          },
        ],
        id: "9541750bc8964e529feb5c6d7bb3d0e4",
        empty: false,
        published: false,
        stats: {
          rows: "1500",
          size: "20480",
        },
        createdBy: {
          id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          fullName: "Logan McNeil",
          descriptor: "Logan McNeil",
        },
        createdMoment: "2024-06-08T07:00:00.000Z",
        updatedBy: {
          id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
          fullName: "Betty Liu",
          descriptor: "Betty Liu",
        },
        updatedMoment: "2024-06-09T07:00:00.000Z",
        dateRefreshed: "2024-06-10T07:00:00.000Z",
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
    displayName: "Employee Compensation",
    description: "Monthly compensation data for all workers",
    documentation: "Reference table for compensation analysis",
    enableForAnalysis: false,
    name: "Employee_Compensation",
    tags: [
      {
        id: "7c6b5a4938271605f4e3d2c1b0a99887",
        name: "Finance",
      },
    ],
    fields: [
      {
        id: "2b3c4d5e6f708192a3b4c5d6e7f80910",
        name: "employee_id",
        ordinal: 0,
        description: "Worker identifier",
        parseFormat: "yyyy-MM-dd",
        type: {
          name: "Boolean",
          id: "Schema_Field_Type=Boolean",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "8f7e6d5c4b3a29180716253443526170",
          descriptor: "Worker",
        },
        context: {
          id: "d4c3b2a1908f7e6d5c4b3a2918071625",
          descriptor: "Worker",
        },
        displayName: "Employee ID",
        defaultValue: "0",
        fieldId: "employee_id",
        required: false,
        externalId: false,
      },
    ],
    id: "6a5b4c3d2e1f00918273645564738291",
    empty: false,
    published: false,
    stats: {
      rows: "1500",
      size: "20480",
    },
    createdBy: {
      id: "b5a4c3d2e1f0091827364554637281a0",
      fullName: "Logan McNeil",
      descriptor: "Logan McNeil",
    },
    createdMoment: "2024-06-08T07:00:00.000Z",
    updatedBy: {
      id: "e1d2c3b4a5960718293a4b5c6d7e8f01",
      fullName: "Betty Liu",
      descriptor: "Betty Liu",
    },
    updatedMoment: "2024-06-09T07:00:00.000Z",
    dateRefreshed: "2024-06-10T07:00:00.000Z",
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
    displayName: "Employee Compensation",
    description: "Monthly compensation data for all workers",
    documentation: "Reference table for compensation analysis",
    enableForAnalysis: false,
    name: "Employee_Compensation",
    tags: [
      {
        id: "4f5e6d7c8b9a0b1c2d3e4f5061728394",
        name: "Finance",
      },
    ],
    fields: [
      {
        id: "c7b8a9605142332415f6e7d8c9b0a1f2",
        name: "employee_id",
        ordinal: 0,
        description: "Worker identifier",
        parseFormat: "yyyy-MM-dd",
        type: {
          name: "Boolean",
          id: "Schema_Field_Type=Boolean",
        },
        precision: 0,
        scale: 0,
        businessObject: {
          id: "3d2c1b0a9f8e7d6c5b4a392817160504",
          descriptor: "Worker",
        },
        context: {
          id: "f0e1d2c3b4a596871625344352617089",
          descriptor: "Worker",
        },
        displayName: "Employee ID",
        defaultValue: "0",
        fieldId: "employee_id",
        required: false,
        externalId: false,
      },
    ],
    id: "5a6b7c8d9e0f102132435465768798a9",
    empty: false,
    published: false,
    stats: {
      rows: "1500",
      size: "20480",
    },
    createdBy: {
      id: "90a1b2c3d4e5f6071829304a5b6c7d8e",
      fullName: "Logan McNeil",
      descriptor: "Logan McNeil",
    },
    createdMoment: "2024-06-08T07:00:00.000Z",
    updatedBy: {
      id: "2e3f405162738495a6b7c8d9e0f10213",
      fullName: "Betty Liu",
      descriptor: "Betty Liu",
    },
    updatedMoment: "2024-06-09T07:00:00.000Z",
    dateRefreshed: "2024-06-10T07:00:00.000Z",
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
    total: 1,
    data: [
      {
        id: "7f8e9d0c1b2a3948576615243342f1e0",
        name: "Monthly_Compensation_Upload",
        displayName: "Monthly Compensation Upload",
        source: {
          sourceType: "UPLOAD",
          id: "aa11bb22cc33dd44ee55ff6677889900",
          name: "Monthly Upload",
        },
        target: {
          id: "1122334455667788990011223344aabb",
          name: "Employee_Compensation",
        },
        createdBy: {
          id: "ff00ee11dd22cc33bb44aa5566778899",
          fullName: "Logan McNeil",
          descriptor: "Logan McNeil",
        },
        createdMoment: "2024-06-08T07:00:00.000Z",
        modifiedBy: {
          id: "3aa5550b7fe348b98d7b5741afc65535",
          fullName: "Steve Morgan",
          descriptor: "Steve Morgan",
        },
        modifiedMoment: "2024-06-09T07:00:00.000Z",
        operation: {
          operationType: "APPEND",
          operationKeys: ["employee_id"],
        },
      },
    ],
  },
};
export const getDataChangesByIdExamplePayload = {
  data: {
    id: "0e44c92412d34b01ace61e80a47aaf6e",
    name: "Monthly_Compensation_Upload",
    displayName: "Monthly Compensation Upload",
    source: {
      sourceType: "UPLOAD",
      id: "cc67c47133894e099a5f1c0aa88efc48",
      name: "Monthly Upload",
      parms: [
        {
          fileNamePattern: "*.csv",
          prompts: {
            descriptor: "Effective Date",
            doNotPromptAtRuntime: false,
            operator: {
              id: "51c4a636bcbc4331b921a1e37b18f6f1",
              descriptor: "equals",
            },
            externalField: {
              id: "9541750bc8964e529feb5c6d7bb3d0e5",
              descriptor: "Employee ID",
            },
            promptQualifier: {
              id: "1f2e3d4c5b6a7988990a1b2c3d4e5f61",
              descriptor: "Value",
            },
            externalParameter: {
              id: "a1b2c3d4e5f60718293a4b5c6d7e8f91",
              descriptor: "Effective Date",
            },
            displayOptions: [
              {
                id: "7c6b5a4938271605f4e3d2c1b0a99888",
                descriptor: "Show",
              },
            ],
            xmlAlias: "effectiveDate",
            order: "1",
            wqlAlias: "effective_date",
            label: "Effective Date",
            dynamicValue: {
              id: "2b3c4d5e6f708192a3b4c5d6e7f80911",
              descriptor: "Today",
            },
            xmlSchemaType: "date",
            promptValue: {
              attributeValue: "2024-06-08",
              workdataType: {
                id: "8f7e6d5c4b3a29180716253443526171",
                type: "Date",
                descriptor: "Date",
              },
              instanceValue: [
                {
                  id: "d4c3b2a1908f7e6d5c4b3a2918071626",
                  descriptor: "Effective Date",
                },
              ],
            },
          },
        },
      ],
      schema: {
        fields: [
          {
            id: "6a5b4c3d2e1f00918273645564738292",
            name: "employee_id",
            ordinal: 0,
            description: "Worker identifier",
            parseFormat: "yyyy-MM-dd",
            type: {
              name: "Boolean",
              id: "Schema_Field_Type=Boolean",
            },
            precision: 0,
            scale: 0,
            businessObject: {
              id: "b5a4c3d2e1f0091827364554637281a1",
              descriptor: "Worker",
            },
            context: {
              id: "e1d2c3b4a5960718293a4b5c6d7e8f02",
              descriptor: "Worker",
            },
          },
        ],
        parseOptions: {
          type: "Delimited",
          charset: "UTF-8",
          fieldsDelimitedBy: ",",
          headerLinesToIgnore: 0,
          fieldsEnclosedBy: '"',
          ignoreTrailingExtraFields: false,
          ignoreTrailingMissingFields: false,
          recordsDelimitedBy: "\n",
          ignoreTrailingWhitespaces: false,
          ignoreLeadingWhitespaces: false,
          fieldsEnclosingCharacterEscapedBy: "\\",
          ignoreTrailingWhitespacesInQuotes: "false",
          ignoreLeadingWhitespacesInQuotes: "false",
          commentCharacter: "#",
        },
      },
    },
    target: {
      id: "4f5e6d7c8b9a0b1c2d3e4f5061728395",
      name: "Employee_Compensation",
    },
    createdBy: {
      id: "c7b8a9605142332415f6e7d8c9b0a1f3",
      fullName: "Logan McNeil",
      descriptor: "Logan McNeil",
    },
    createdMoment: "2024-06-08T07:00:00.000Z",
    modifiedBy: {
      id: "3d2c1b0a9f8e7d6c5b4a392817160505",
      fullName: "Steve Morgan",
      descriptor: "Steve Morgan",
    },
    modifiedMoment: "2024-06-09T07:00:00.000Z",
    operation: {
      operationType: "APPEND",
      operationKeys: ["employee_id"],
    },
    mappings: [
      {
        sourceFieldName: "emp_id",
        targetFieldName: "employee_id",
      },
    ],
    errorMessage: "No errors reported",
    updatedBy: {
      id: "f0e1d2c3b4a596871625344352617090",
      fullName: "Betty Liu",
      descriptor: "Betty Liu",
    },
    updatedMoment: "2024-06-10T07:00:00.000Z",
  },
};
export const postFileContainersExamplePayload = {
  data: {
    id: "5a6b7c8d9e0f102132435465768798aa",
  },
};
export const getFilesByContainerIdExamplePayload = {
  data: {
    total: 1,
    data: [
      {
        id: "90a1b2c3d4e5f6071829304a5b6c7d8f",
        descriptor: "invoice-2024-06.pdf",
        name: "invoice-2024-06.pdf",
        checksum: "d41d8cd98f00b204e9800998ecf8427e",
        length: "20480",
        state: {
          id: "2e3f405162738495a6b7c8d9e0f10214",
        },
        allowedFileSize: "104857600",
      },
    ],
  },
};
export const postFilesByContainerIdExamplePayload = {
  data: {
    id: "7f8e9d0c1b2a3948576615243342f1e1",
    descriptor: "invoice-2024-06.pdf",
    name: "invoice-2024-06.pdf",
    checksum: "e99a18c428cb38d5f260853678922e03",
    length: "20480",
    state: {
      id: "aa11bb22cc33dd44ee55ff6677889901",
    },
    allowedFileSize: "104857600",
  },
};
