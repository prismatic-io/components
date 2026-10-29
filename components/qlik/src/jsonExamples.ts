export const dataSetExample = {
  tags: [],
  type: "string",
  name: "string",
  schema: {
    anomalies: [],
    dataFields: [
      {
        name: "string",
        tags: [],
        alias: "string",
        index: 0,
        orphan: true,
        dataType: {
          type: "DATE",
          properties: {},
          originalType: "string",
        },
        nullable: true,
        userTags: [
          {
            id: "string",
            name: "string",
          },
        ],
        encrypted: true,
        sensitive: true,
        primaryKey: true,
        properties: {},
        description: "string",
        ordinalPositionInKey: 0,
      },
    ],
    schemaName: "string",
    loadOptions: {},
    effectiveDate: "2023-10-11T22:12:27.408Z",
    overrideSchemaAnomalies: true,
  },
  ownerId: "string",
  spaceId: "string",
  version: 0,
  tenantId: "string",
  createdBy: "string",
  properties: {},
  createdTime: "2023-10-11T22:12:27.408Z",
  description: "string",
  operational: {
    size: 0,
    status: "string",
    endDate: "2023-10-11T22:12:27.408Z",
    location: "string",
    rowCount: 0,
    startDate: "2023-10-11T22:12:27.408Z",
    logMessage: "string",
    tableOwner: "string",
    lastLoadTime: "2023-10-11T22:12:27.408Z",
    contentUpdated: true,
    lastUpdateTime: "2023-10-11T22:12:27.408Z",
    tableConnectionInfo: {
      tableName: "string",
      selectionScript: "string",
      additionalProperties: {},
    },
  },
  dataAssetInfo: {
    id: "string",
    name: "string",
    dataStoreInfo: {
      id: "string",
      name: "string",
      type: "string",
    },
  },
  lastModifiedBy: "string",
  classifications: {
    subjectArea: "string",
    personalInformation: [
      {
        fieldName: "string",
        tableName: "string",
        fieldAlias: "string",
      },
    ],
    sensitiveInformation: [
      {
        fieldName: "string",
        tableName: "string",
        fieldAlias: "string",
      },
    ],
  },
  lastModifiedTime: "2023-10-11T22:12:27.408Z",
  additionalSchemas: [
    {
      anomalies: [],
      dataFields: [
        {
          name: "string",
          tags: [],
          alias: "string",
          index: 0,
          orphan: true,
          dataType: {
            type: "DATE",
            properties: {},
            originalType: "string",
          },
          nullable: true,
          userTags: [
            {
              id: "string",
              name: "string",
            },
          ],
          encrypted: true,
          sensitive: true,
          primaryKey: true,
          properties: {},
          description: "string",
          ordinalPositionInKey: 0,
        },
      ],
      schemaName: "string",
      loadOptions: {},
      effectiveDate: "2023-10-11T22:12:27.408Z",
      overrideSchemaAnomalies: true,
    },
  ],
  technicalDescription: "string",
};

export const dataAssetExample = {
  name: "string",
  tags: [],
  appId: "string",
  ownerId: "string",
  spaceId: "string",
  version: 0,
  tenantId: "string",
  createdBy: "string",
  properties: {},
  createdTime: "2023-10-12T17:32:07.820Z",
  description: "string",
  dataStoreInfo: {
    id: "string",
    name: "string",
    type: "string",
  },
  lastModifiedBy: "string",
  lastModifiedTime: "2023-10-12T17:32:07.820Z",
  technicalDescription: "string",
};

export const dataStoreExample = {
  name: "string",
  tags: [],
  ownerId: "string",
  spaceId: "string",
  version: 0,
  tenantId: "string",
  createdBy: "string",
  properties: {},
  createdTime: "2023-10-12T19:55:20.881Z",
  description: "string",
  lastModifiedBy: "string",
  lastModifiedTime: "2023-10-12T19:55:20.881Z",
  technicalDescription: "string",
};

export const reportExampleRequest = {
  type: "composition-1.0",
  output: {
    type: "pdfcomposition",
    outputId: "composition1",
    pdfCompositionOutput: {
      pdfOutputs: [
        {
          size: "A4",
          align: {
            vertical: "middle",
            horizontal: "center",
          },
          resizeType: "autofit",
          orientation: "A",
        },
        {
          size: "A4",
          align: {
            vertical: "middle",
            horizontal: "center",
          },
          resizeType: "autofit",
          orientation: "A",
        },
      ],
    },
  },
  definitions: {
    selectionsByState: {
      sel1: {
        $: [
          {
            values: [
              {
                text: "Arizona",
                isNumeric: false,
              },
            ],
            fieldName: "Region",
            defaultIsNumeric: false,
          },
        ],
      },
    },
  },
  compositionTemplates: [
    {
      type: "sense-sheet-1.0",
      senseSheetTemplate: {
        appId: "2451e58e-a1b9-4047-abf6-315e91d8a610",
        sheet: {
          id: "5ffe3801-1b6d-439d-a849-84d0748358f1",
        },
        selectionsByStateDef: "sel1",
      },
    },
    {
      type: "sense-sheet-1.0",
      senseSheetTemplate: {
        appId: "2451e58e-a1b9-4047-abf6-315e91d8a610",
        sheet: {
          id: "ffrxJyA",
        },
        selectionsByStateDef: "sel1",
      },
    },
  ],
};
