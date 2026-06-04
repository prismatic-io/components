




export const createDatasetExamplePayload = {
  data: {
    id: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
    name: "SalesDataset",
    defaultRetentionPolicy: "basicFIFO",
    addRowsAPIEnabled: true,
    configuredBy: "john.doe@example.com",
    isRefreshable: false,
    isEffectiveIdentityRequired: false,
    isEffectiveIdentityRolesRequired: false,
    isOnPremGatewayRequired: false,
    description: "Sales and marketing metrics dataset",
    createdDate: "2024-01-15T10:30:00Z",
    webUrl:
      "https://app.powerbi.com/groups/me/datasets/cfafbeb1-8037-4d0c-896e-a46fb27ff229",
    targetStorageMode: "Push",
  },
};

export const listDatasetsExamplePayload = {
  data: {
    "@odata.context": "https://api.powerbi.com/v1.0/myorg/$metadata#datasets",
    value: [
    {
      id: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      name: "SalesDataset",
      addRowsAPIEnabled: true,
      configuredBy: "john.doe@example.com",
      isRefreshable: false,
      isEffectiveIdentityRequired: false,
      isEffectiveIdentityRolesRequired: false,
      isOnPremGatewayRequired: false,
      description: "Sales and marketing metrics dataset",
      createdDate: "2024-01-15T10:30:00Z",
      webUrl:
        "https://app.powerbi.com/groups/me/datasets/cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      targetStorageMode: "Push",
    },
    {
      id: "d92e3c1b-5f41-4e2d-9a8c-b7f2e1c3d4a5",
      name: "FinanceData",
      addRowsAPIEnabled: false,
      configuredBy: "jane.smith@example.com",
      isRefreshable: true,
      isEffectiveIdentityRequired: true,
      isEffectiveIdentityRolesRequired: true,
      isOnPremGatewayRequired: true,
      description: "Financial reporting dataset",
      createdDate: "2024-02-20T14:45:00Z",
      webUrl:
        "https://app.powerbi.com/groups/me/datasets/d92e3c1b-5f41-4e2d-9a8c-b7f2e1c3d4a5",
      targetStorageMode: "DirectQuery",
    },
    ],
  },
};


export const listTablesExamplePayload = {
  data: {
    "@odata.context":
      "https://api.powerbi.com/v1.0/myorg/$metadata#datasets('cfafbeb1-8037-4d0c-896e-a46fb27ff229')/tables",
    value: [
    {
      name: "SalesData",
      description: "Sales transaction data",
      isHidden: false,
      columns: [
        {
          name: "ProductID",
          dataType: "Int64",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "Name",
          dataType: "String",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "Category",
          dataType: "String",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "IsComplete",
          dataType: "Boolean",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "ManufacturedOn",
          dataType: "DateTime",
          dataCategory: null,
          formatString: "yyyy-MM-dd",
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "Sales",
          dataType: "Int64",
          dataCategory: null,
          formatString: "Currency",
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "Sum",
        },
      ],
      measures: [],
      rows: [],
      source: [],
    },
    {
      name: "Customers",
      description: "Customer information",
      isHidden: false,
      columns: [
        {
          name: "CustomerID",
          dataType: "Int64",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "CustomerName",
          dataType: "String",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
        {
          name: "Email",
          dataType: "String",
          dataCategory: null,
          formatString: null,
          isHidden: false,
          sortByColumn: null,
          summarizeBy: "None",
        },
      ],
      measures: [],
      rows: [],
      source: [],
    },
    ],
  },
};

export const updateTableExamplePayload = {
  data: {
    name: "SalesData",
    description: "Updated sales transaction data",
    isHidden: false,
    columns: [
      {
        name: "ProductID",
        dataType: "Int64",
        dataCategory: null,
        formatString: null,
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "None",
      },
      {
        name: "Name",
        dataType: "String",
        dataCategory: null,
        formatString: null,
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "None",
      },
      {
        name: "Category",
        dataType: "String",
        dataCategory: null,
        formatString: null,
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "None",
      },
      {
        name: "IsComplete",
        dataType: "Boolean",
        dataCategory: null,
        formatString: null,
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "None",
      },
      {
        name: "ManufacturedOn",
        dataType: "DateTime",
        dataCategory: null,
        formatString: "yyyy-MM-dd",
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "None",
      },
      {
        name: "Sales",
        dataType: "Int64",
        dataCategory: null,
        formatString: "Currency",
        isHidden: false,
        sortByColumn: null,
        summarizeBy: "Sum",
      },
    ],
    measures: [],
    rows: [],
    source: [],
  },
};



export const createRowExamplePayload = {
  data: {},
};

export const deleteRowsExamplePayload = {
  data: {},
};


export const listGroupsExamplePayload = {
  data: {
    "@odata.context": "https://api.powerbi.com/v1.0/myorg/$metadata#groups",
    value: [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Sales and Marketing",
      isReadOnly: false,
      isOnDedicatedCapacity: true,
      capacityId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      defaultDatasetStorageFormat: "Small",
      dataflowStorageId: null,
    },
    {
      id: "b3c4d5e6-f7a8-9012-cdef-123456789012",
      name: "Finance Workspace",
      isReadOnly: false,
      isOnDedicatedCapacity: false,
      capacityId: null,
      defaultDatasetStorageFormat: "Small",
      dataflowStorageId: null,
    },
    {
      id: "c4d5e6f7-a890-1234-defg-234567890123",
      name: "Engineering Team",
      isReadOnly: true,
      isOnDedicatedCapacity: true,
      capacityId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      defaultDatasetStorageFormat: "Large",
      dataflowStorageId: "d5e6f7a8-9012-3456-efgh-345678901234",
    },
    ],
  },
};


export const listReportsExamplePayload = {
  data: {
    "@odata.context": "https://api.powerbi.com/v1.0/myorg/$metadata#reports",
    value: [
    {
      datasetId: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      id: "e1f2a3b4-c5d6-7890-efab-cd1234567890",
      name: "Sales Performance Report",
      webUrl:
        "https://app.powerbi.com/groups/me/reports/e1f2a3b4-c5d6-7890-efab-cd1234567890",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=e1f2a3b4-c5d6-7890-efab-cd1234567890",
      appId: null,
      description: "Monthly sales performance metrics and KPIs",
      isOwnedByMe: true,
      originalReportId: null,
      reportType: "PowerBIReport",
      subscriptions: [],
      users: [],
    },
    {
      datasetId: "d92e3c1b-5f41-4e2d-9a8c-b7f2e1c3d4a5",
      id: "f2a3b4c5-d6e7-8901-fabc-de2345678901",
      name: "Financial Summary",
      webUrl:
        "https://app.powerbi.com/groups/me/reports/f2a3b4c5-d6e7-8901-fabc-de2345678901",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=f2a3b4c5-d6e7-8901-fabc-de2345678901",
      appId: "12345678-90ab-cdef-1234-567890abcdef",
      description: "Quarterly financial reporting",
      isOwnedByMe: false,
      originalReportId: "a3b4c5d6-e7f8-9012-abcd-ef3456789012",
      reportType: "PowerBIReport",
      subscriptions: [],
      users: [],
    },
    {
      datasetId: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      id: "a4b5c6d7-e8f9-0123-bcde-f34567890123",
      name: "Inventory Report",
      webUrl:
        "https://app.powerbi.com/groups/me/reports/a4b5c6d7-e8f9-0123-bcde-f34567890123",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=a4b5c6d7-e8f9-0123-bcde-f34567890123",
      appId: null,
      description: null,
      isOwnedByMe: true,
      originalReportId: null,
      reportType: "PaginatedReport",
      subscriptions: [],
      users: [],
    },
    ],
  },
};
