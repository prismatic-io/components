




















export const getStreamExamplePayload = {
  data: {
    id: 32,
    dataSet: {
      id: "4405ff58-1957-45f4-b159-8e7a88cc7dcc",
      name: "Monthly Sales Report",
      description: "Monthly sales data aggregated by region",
      rows: 1250,
      columns: 5,
      owner: {
        id: 87264918,
        name: "Jane Smith",
      },
      createdAt: "2024-01-15T08:30:00.000Z",
      updatedAt: "2024-03-10T14:22:00.000Z",
      pdpEnabled: false,
    },
    updateMethod: "APPEND",
    createdAt: "2024-01-15T08:30:00.000Z",
    modifiedAt: "2024-03-10T14:22:00.000Z",
  },
};

export const listStreamsExamplePayload = {
  data: [
    getStreamExamplePayload.data,
    {
      id: 45,
      dataSet: {
        id: "7b3e8f21-3c6d-4a11-9e2f-5d8b12c45e90",
        name: "Customer Churn Analysis",
        description: "Weekly customer churn metrics",
        rows: 4300,
        columns: 8,
        owner: {
          id: 54320910,
          name: "Carlos Rivera",
        },
        createdAt: "2023-11-02T10:00:00.000Z",
        updatedAt: "2024-03-08T09:15:00.000Z",
        pdpEnabled: true,
      },
      updateMethod: "REPLACE",
      createdAt: "2023-11-02T10:00:00.000Z",
      modifiedAt: "2024-03-08T09:15:00.000Z",
    },
  ],
};

export const createStreamExamplePayload = getStreamExamplePayload;

export const updateStreamExamplePayload = {
  data: {
    ...getStreamExamplePayload.data,
    updateMethod: "REPLACE",
    modifiedAt: "2024-04-01T10:00:00.000Z",
  },
};

export const deleteStreamExamplePayload = { data: null };

export const searchStreamExamplePayload = listStreamsExamplePayload;

export const getStreamExecutionExamplePayload = {
  data: {
    id: 1,
    startedAt: "2024-03-10T14:00:00.000Z",
    endedAt: "2024-03-10T14:05:32.000Z",
    currentState: "SUCCESS",
    createdAt: "2024-03-10T14:00:00.000Z",
    modifiedAt: "2024-03-10T14:05:32.000Z",
  },
};

export const listStreamExecutionExamplePayload = {
  data: [
    getStreamExecutionExamplePayload.data,
    {
      id: 2,
      startedAt: "2024-03-11T14:00:00.000Z",
      endedAt: "2024-03-11T14:04:10.000Z",
      currentState: "SUCCESS",
      createdAt: "2024-03-11T14:00:00.000Z",
      modifiedAt: "2024-03-11T14:04:10.000Z",
    },
  ],
};

export const createStreamExecutionExamplePayload = {
  data: {
    id: 3,
    startedAt: "2024-04-01T10:00:00.000Z",
    endedAt: null,
    currentState: "ACTIVE",
    createdAt: "2024-04-01T10:00:00.000Z",
    modifiedAt: "2024-04-01T10:00:00.000Z",
  },
};

export const commitStreamExecutionExamplePayload = {
  data: {
    id: 3,
    startedAt: "2024-04-01T10:00:00.000Z",
    endedAt: "2024-04-01T10:03:45.000Z",
    currentState: "SUCCESS",
    createdAt: "2024-04-01T10:00:00.000Z",
    modifiedAt: "2024-04-01T10:03:45.000Z",
  },
};

export const abortStreamExecutionExamplePayload = { data: null };

export const uploadDataPartExamplePayload = { data: null };
