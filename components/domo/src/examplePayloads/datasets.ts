
















export const getDataSetExamplePayload = {
  data: {
    id: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
    name: "Monthly Sales Report",
    description: "Monthly sales data aggregated by region",
    rows: 1250,
    columns: 5,
    schema: {
      columns: [
        { type: "STRING", name: "region" },
        { type: "STRING", name: "product" },
        { type: "LONG", name: "units_sold" },
        { type: "DOUBLE", name: "revenue" },
        { type: "DATE", name: "sale_date" },
      ],
    },
    owner: {
      id: 87264918,
      name: "Jane Smith",
    },
    pdpEnabled: false,
    createdAt: "2024-01-15T08:30:00.000Z",
    updatedAt: "2024-03-10T14:22:00.000Z",
  },
};

export const listDataSetsExamplePayload = {
  data: [
    getDataSetExamplePayload.data,
    {
      id: "7b3e8f21-3c6d-4a11-9e2f-5d8b12c45e90",
      name: "Customer Churn Analysis",
      description: "Weekly customer churn metrics",
      rows: 4300,
      columns: 8,
      schema: {
        columns: [
          { type: "LONG", name: "customer_id" },
          { type: "STRING", name: "segment" },
          { type: "DATE", name: "churn_date" },
          { type: "DOUBLE", name: "lifetime_value" },
          { type: "STRING", name: "churn_reason" },
          { type: "STRING", name: "plan_type" },
          { type: "LONG", name: "tenure_days" },
          { type: "STRING", name: "region" },
        ],
      },
      owner: {
        id: 54320910,
        name: "Carlos Rivera",
      },
      pdpEnabled: true,
      createdAt: "2023-11-02T10:00:00.000Z",
      updatedAt: "2024-03-08T09:15:00.000Z",
    },
  ],
};

export const createDataSetExamplePayload = getDataSetExamplePayload;

export const updateDataSetExamplePayload = {
  data: {
    ...getDataSetExamplePayload.data,
    name: "Monthly Sales Report (Updated)",
    updatedAt: "2024-04-01T11:00:00.000Z",
  },
};

export const deleteDataSetExamplePayload = { data: null };

export const exportDataFromDataSetExamplePayload = {
  data: "region,product,units_sold,revenue,sale_date\nNorth,Widget A,150,7500.00,2024-01-01\nSouth,Widget B,200,9800.00,2024-01-01\n",
};

export const importDataIntoDataSetExamplePayload = { data: null };

export const queryDataSetExamplePayload = {
  data: {
    datasource: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
    columns: ["region", "product", "units_sold"],
    metadata: [
      {
        type: "STRING",
        dataSourceId: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
        maxLength: 0,
        minLength: 0,
        periodIndex: -1,
        name: "region",
      },
      {
        type: "STRING",
        dataSourceId: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
        maxLength: 0,
        minLength: 0,
        periodIndex: -1,
        name: "product",
      },
      {
        type: "LONG",
        dataSourceId: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
        maxLength: 0,
        minLength: 0,
        periodIndex: -1,
        name: "units_sold",
      },
    ],
    rows: [
      ["North", "Widget A", 150],
      ["South", "Widget B", 200],
      ["East", "Widget C", 175],
    ],
    numRows: 3,
    numColumns: 3,
    fromcache: false,
  },
};
