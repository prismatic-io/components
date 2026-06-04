




















export const getDatasetExamplePayload = {
  data: {
    kind: "bigquery#dataset",
    id: "my-project:my_dataset",
    datasetReference: {
      datasetId: "my_dataset",
      projectId: "my-project",
    },
    friendlyName: "My Dataset",
    description: "This is a sample dataset for analytics",
    location: "US",
    defaultTableExpirationMs: "3600000",
    labels: {
      environment: "production",
      team: "analytics",
    },
    access: [
      {
        role: "WRITER",
        userByEmail: "user@example.com",
      },
      {
        role: "READER",
        specialGroup: "projectReaders",
      },
    ],
    creationTime: "1609459200000",
    lastModifiedTime: "1640995200000",
    etag: "abc123def456",
    selfLink:
      "https://bigquery.googleapis.com/bigquery/v2/projects/my-project/datasets/my_dataset",
  },
};






export const createDatasetExamplePayload = getDatasetExamplePayload;






export const updateDatasetExamplePayload = getDatasetExamplePayload;






export const listDatasetsExamplePayload = {
  data: {
    kind: "bigquery#datasetList",
    etag: "abc123def456",
    datasets: [
      {
        kind: "bigquery#dataset",
        id: "my-project:my_dataset",
        datasetReference: {
          datasetId: "my_dataset",
          projectId: "my-project",
        },
        friendlyName: "My Dataset",
        location: "US",
      },
      {
        kind: "bigquery#dataset",
        id: "my-project:analytics_dataset",
        datasetReference: {
          datasetId: "analytics_dataset",
          projectId: "my-project",
        },
        friendlyName: "Analytics Dataset",
        location: "US",
      },
    ],
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};







export const deleteDatasetExamplePayload = {
  data: {},
};










export const getTableExamplePayload = {
  data: {
    kind: "bigquery#table",
    id: "my-project:my_dataset.my_table",
    tableReference: {
      projectId: "my-project",
      datasetId: "my_dataset",
      tableId: "my_table",
    },
    friendlyName: "My Table",
    description: "Sample table for user data",
    type: "TABLE",
    schema: {
      fields: [
        {
          name: "user_id",
          type: "STRING",
          mode: "REQUIRED",
          description: "Unique user identifier",
        },
        {
          name: "email",
          type: "STRING",
          mode: "NULLABLE",
        },
        {
          name: "created_at",
          type: "TIMESTAMP",
          mode: "NULLABLE",
        },
        {
          name: "metadata",
          type: "RECORD",
          mode: "NULLABLE",
          fields: [
            {
              name: "source",
              type: "STRING",
              mode: "NULLABLE",
            },
            {
              name: "tags",
              type: "STRING",
              mode: "REPEATED",
            },
          ],
        },
      ],
    },
    numBytes: "1024000",
    numLongTermBytes: "512000",
    numRows: "1000",
    creationTime: "1609459200000",
    lastModifiedTime: "1640995200000",
    expirationTime: "1672531200000",
    location: "US",
    labels: {
      environment: "production",
    },
    etag: "abc123def456",
    selfLink:
      "https://bigquery.googleapis.com/bigquery/v2/projects/my-project/datasets/my_dataset/tables/my_table",
  },
};






export const createTableExamplePayload = getTableExamplePayload;






export const updateTableExamplePayload = getTableExamplePayload;






export const patchTableExamplePayload = getTableExamplePayload;






export const listTablesExamplePayload = {
  data: {
    kind: "bigquery#tableList",
    etag: "abc123def456",
    tables: [
      {
        kind: "bigquery#table",
        id: "my-project:my_dataset.my_table",
        tableReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          tableId: "my_table",
        },
        friendlyName: "My Table",
        type: "TABLE",
        creationTime: "1609459200000",
      },
      {
        kind: "bigquery#table",
        id: "my-project:my_dataset.users_table",
        tableReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          tableId: "users_table",
        },
        friendlyName: "Users Table",
        type: "TABLE",
        creationTime: "1612137600000",
      },
    ],
    totalItems: 2,
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};







export const deleteTableExamplePayload = {
  data: {},
};










export const getJobExamplePayload = {
  data: {
    kind: "bigquery#job",
    id: "my-project:US.job_abc123def456",
    jobReference: {
      projectId: "my-project",
      jobId: "job_abc123def456",
      location: "US",
    },
    status: {
      state: "DONE",
    },
    configuration: {
      query: {
        query: "SELECT * FROM `my-project.my_dataset.my_table` LIMIT 100",
        destinationTable: {
          projectId: "my-project",
          datasetId: "my_dataset",
          tableId: "results_table",
        },
        useLegacySql: false,
        priority: "INTERACTIVE",
      },
    },
    statistics: {
      creationTime: "1640995200000",
      startTime: "1640995205000",
      endTime: "1640995210000",
      totalBytesProcessed: "1024000",
      query: {
        totalBytesProcessed: "1024000",
        totalBytesBilled: "10485760",
        cacheHit: false,
        statementType: "SELECT",
      },
    },
    etag: "abc123def456",
    selfLink:
      "https://bigquery.googleapis.com/bigquery/v2/projects/my-project/jobs/job_abc123def456",
    user_email: "user@example.com",
  },
};






export const createJobExamplePayload = getJobExamplePayload;






export const queryJobExamplePayload = {
  data: {
    kind: "bigquery#queryResponse",
    schema: {
      fields: [
        {
          name: "user_id",
          type: "STRING",
          mode: "NULLABLE",
        },
        {
          name: "email",
          type: "STRING",
          mode: "NULLABLE",
        },
        {
          name: "total_orders",
          type: "INTEGER",
          mode: "NULLABLE",
        },
      ],
    },
    jobReference: {
      projectId: "my-project",
      jobId: "job_abc123def456",
      location: "US",
    },
    totalRows: "100",
    rows: [
      {
        f: [{ v: "user_001" }, { v: "user001@example.com" }, { v: "25" }],
      },
      {
        f: [{ v: "user_002" }, { v: "user002@example.com" }, { v: "42" }],
      },
    ],
    totalBytesProcessed: "1024000",
    jobComplete: true,
    cacheHit: false,
  },
};






export const getQueryJobResultExamplePayload = {
  data: {
    kind: "bigquery#getQueryResultsResponse",
    etag: "abc123def456",
    schema: {
      fields: [
        {
          name: "user_id",
          type: "STRING",
          mode: "NULLABLE",
        },
        {
          name: "email",
          type: "STRING",
          mode: "NULLABLE",
        },
      ],
    },
    jobReference: {
      projectId: "my-project",
      jobId: "job_abc123def456",
      location: "US",
    },
    totalRows: "1000",
    rows: [
      {
        f: [{ v: "user_001" }, { v: "user001@example.com" }],
      },
      {
        f: [{ v: "user_002" }, { v: "user002@example.com" }],
      },
    ],
    pageToken: "eyJwYWdlIjogMn0=",
    totalBytesProcessed: "1024000",
    jobComplete: true,
    cacheHit: false,
  },
};






export const listJobsExamplePayload = {
  data: {
    kind: "bigquery#jobList",
    etag: "abc123def456",
    jobs: [
      {
        kind: "bigquery#job",
        id: "my-project:US.job_abc123def456",
        jobReference: {
          projectId: "my-project",
          jobId: "job_abc123def456",
          location: "US",
        },
        status: {
          state: "DONE",
        },
        configuration: {
          query: {
            query: "SELECT * FROM `my-project.my_dataset.my_table`",
          },
        },
        statistics: {
          creationTime: "1640995200000",
          startTime: "1640995205000",
          endTime: "1640995210000",
        },
        user_email: "user@example.com",
      },
      {
        kind: "bigquery#job",
        id: "my-project:US.job_xyz789ghi012",
        jobReference: {
          projectId: "my-project",
          jobId: "job_xyz789ghi012",
          location: "US",
        },
        status: {
          state: "RUNNING",
        },
        configuration: {
          load: {
            sourceUris: ["gs://bucket/data.csv"],
            destinationTable: {
              projectId: "my-project",
              datasetId: "my_dataset",
              tableId: "loaded_data",
            },
          },
        },
        statistics: {
          creationTime: "1640995300000",
          startTime: "1640995305000",
        },
        user_email: "user@example.com",
      },
    ],
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};






export const cancelJobExamplePayload = {
  data: {
    kind: "bigquery#jobCancelResponse",
    job: {
      kind: "bigquery#job",
      id: "my-project:US.job_abc123def456",
      jobReference: {
        projectId: "my-project",
        jobId: "job_abc123def456",
        location: "US",
      },
      status: {
        state: "DONE",
        errorResult: {
          reason: "stopped",
          message: "Job execution was cancelled",
        },
      },
      statistics: {
        creationTime: "1640995200000",
        startTime: "1640995205000",
        endTime: "1640995215000",
      },
    },
  },
};







export const deleteJobExamplePayload = {
  data: {},
};










export const listTableDataExamplePayload = {
  data: {
    kind: "bigquery#tableDataList",
    etag: "abc123def456",
    totalRows: "1000",
    rows: [
      {
        f: [
          { v: "user_001" },
          { v: "user001@example.com" },
          { v: "1609459200.0" },
        ],
      },
      {
        f: [
          { v: "user_002" },
          { v: "user002@example.com" },
          { v: "1609545600.0" },
        ],
      },
    ],
    pageToken: "eyJwYWdlIjogMn0=",
  },
};






export const tableDataInsertAllExamplePayload = {
  data: {
    kind: "bigquery#tableDataInsertAllResponse",
    insertErrors: [],
  },
};










export const getModelExamplePayload = {
  data: {
    kind: "bigquery#model",
    modelReference: {
      projectId: "my-project",
      datasetId: "my_dataset",
      modelId: "my_model",
    },
    modelType: "LOGISTIC_REGRESSION",
    creationTime: "1609459200000",
    lastModifiedTime: "1640995200000",
    trainingRuns: [
      {
        trainingOptions: {
          maxIterations: "20",
          learnRate: "0.1",
        },
        startTime: "1609459200000",
        results: [
          {
            duration: "5000",
            trainingLoss: "0.45",
            evalLoss: "0.48",
          },
        ],
      },
    ],
    featureColumns: [
      {
        name: "feature1",
        type: "FLOAT64",
      },
      {
        name: "feature2",
        type: "STRING",
      },
    ],
    labelColumns: [
      {
        name: "label",
        type: "INT64",
      },
    ],
    etag: "abc123def456",
    location: "US",
    friendlyName: "My ML Model",
    description: "Logistic regression model for user classification",
  },
};






export const updateModelExamplePayload = getModelExamplePayload;






export const listModelsExamplePayload = {
  data: {
    kind: "bigquery#listModelsResponse",
    models: [
      {
        kind: "bigquery#model",
        modelReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          modelId: "my_model",
        },
        modelType: "LOGISTIC_REGRESSION",
        creationTime: "1609459200000",
        lastModifiedTime: "1640995200000",
        friendlyName: "My ML Model",
      },
      {
        kind: "bigquery#model",
        modelReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          modelId: "regression_model",
        },
        modelType: "LINEAR_REGRESSION",
        creationTime: "1612137600000",
        lastModifiedTime: "1643673600000",
        friendlyName: "Sales Prediction Model",
      },
    ],
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};







export const deleteModelExamplePayload = {
  data: {},
};










export const getRoutineExamplePayload = {
  data: {
    kind: "bigquery#routine",
    etag: "abc123def456",
    routineReference: {
      projectId: "my-project",
      datasetId: "my_dataset",
      routineId: "my_routine",
    },
    routineType: "SCALAR_FUNCTION",
    creationTime: "1609459200000",
    lastModifiedTime: "1640995200000",
    language: "SQL",
    arguments: [
      {
        name: "input_value",
        dataType: {
          typeKind: "INT64",
        },
      },
    ],
    returnType: {
      typeKind: "FLOAT64",
    },
    definitionBody: "input_value * 2.5",
    description: "Multiplies input by 2.5",
  },
};






export const createRoutineExamplePayload = getRoutineExamplePayload;






export const updateRoutineExamplePayload = getRoutineExamplePayload;






export const listRoutinesExamplePayload = {
  data: {
    kind: "bigquery#routineList",
    routines: [
      {
        kind: "bigquery#routine",
        routineReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          routineId: "my_routine",
        },
        routineType: "SCALAR_FUNCTION",
        creationTime: "1609459200000",
        lastModifiedTime: "1640995200000",
        language: "SQL",
      },
      {
        kind: "bigquery#routine",
        routineReference: {
          projectId: "my-project",
          datasetId: "my_dataset",
          routineId: "aggregate_function",
        },
        routineType: "AGGREGATE_FUNCTION",
        creationTime: "1612137600000",
        lastModifiedTime: "1643673600000",
        language: "JAVASCRIPT",
      },
    ],
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};







export const deleteRoutineExamplePayload = {
  data: {},
};










export const listProjectsExamplePayload = {
  data: {
    kind: "bigquery#projectList",
    etag: "abc123def456",
    projects: [
      {
        kind: "bigquery#project",
        id: "my-project",
        projectReference: {
          projectId: "my-project",
        },
        friendlyName: "My Project",
        numericId: "123456789012",
      },
      {
        kind: "bigquery#project",
        id: "analytics-project",
        projectReference: {
          projectId: "analytics-project",
        },
        friendlyName: "Analytics Project",
        numericId: "234567890123",
      },
    ],
    totalItems: 2,
    nextPageToken: "eyJwYWdlIjogMn0=",
  },
};






export const getServiceAccountExamplePayload = {
  data: {
    kind: "bigquery#getServiceAccountResponse",
    email: "123456789012-compute@developer.gserviceaccount.com",
  },
};










export const getPolicyExamplePayload = {
  data: {
    version: 1,
    etag: "abc123def456",
    bindings: [
      {
        role: "roles/bigquery.dataViewer",
        members: ["user:alice@example.com", "group:analytics-team@example.com"],
      },
      {
        role: "roles/bigquery.dataEditor",
        members: ["user:bob@example.com"],
      },
    ],
  },
};






export const setPolicyExamplePayload = getPolicyExamplePayload;









export const rawRequestExamplePayload = {
  data: {
    kind: "bigquery#genericResponse",
    message: "Request completed successfully",
  },
};
