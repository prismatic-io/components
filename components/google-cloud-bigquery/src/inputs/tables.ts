import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean } from "../util";
import {
  connectionInput,
  datasetId,
  defaultCollation,
  defaultRoundingMode,
  description,
  encryptionConfiguration,
  expirationTime,
  friendlyName,
  kind,
  labels,
  maxResults,
  pageToken,
  projectId,
  selectedFields,
  tableId,
} from "./common";

export const requirePartitionFilter = input({
  label: "Require Partition Filter",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, queries over this table require a partition filter that can be used for partition elimination to be specified.",
  required: false,
});

export const numBytes = input({
  label: "Num Bytes",
  type: "string",
  clean: cleanString,
  comments:
    "Output only. The size of this table in logical bytes, excluding any data in the streaming buffer.",
  example: "1234567890",
  placeholder: "Enter number of bytes",
  required: false,
});

export const numLongTermBytes = input({
  label: "Num Long Term Bytes",
  type: "string",
  clean: cleanString,
  comments:
    "Output only. The number of logical bytes in the table that are considered 'long-term storage'.",
  example: "9876543210",
  placeholder: "Enter number of long-term bytes",
  required: false,
});

export const numRows = input({
  label: "Num Rows",
  type: "string",
  clean: cleanString,
  comments:
    "Output only. The number of rows of data in this table, excluding any data in the streaming buffer.",
  example: "1000000",
  placeholder: "Enter number of rows",
  required: false,
});

export const type = input({
  label: "Type",
  type: "string",
  clean: cleanString,
  comments:
    "Output only. Describes the table type. The following values are supported:\n TABLE: A normal BigQuery table.\nVIEW: A virtual table defined by a SQL query. \nEXTERNAL: A table that references data stored in an external storage system, such as Google Cloud Storage. \nMATERIALIZED_VIEW: A precomputed view defined by a SQL query. \nSNAPSHOT: An immutable BigQuery table that preserves the contents of a base table at a particular time. See additional information on table snapshots. \nThe default value is TABLE.",
  example: "TABLE",
  placeholder: "Enter table type",
  required: false,
});

export const maxStaleness = input({
  label: "Max Staleness",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. The maximum staleness of data that could be returned when the table (or stale MV) is queried. Staleness encoded as a string encoding of sql IntervalValue type.",
  example: "INTERVAL 1 DAY",
  placeholder: "Enter max staleness",
  required: false,
});

export const view = input({
  label: "View",
  type: "string",
  clean: cleanString,
  comments:
    "Optional. Specifies the view that determines which table information is returned. By default, basic table information and storage statistics (STORAGE_STATS) are returned. One of TABLE_METADATA_VIEW_UNSPECIFIED / BASIC / STORAGE_STATS / FULL",
  example: "FULL",
  placeholder: "Enter view type",
  required: false,
});

export const schema = input({
  label: "Schema",
  type: "code",
  language: "json",
  comments: "Optional. Describes the schema of this table.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tableschema",
  clean: jsonInputClean,
  required: false,
});

export const timePartitioning = input({
  label: "Time Partitioning",
  type: "code",
  language: "json",
  comments: "If specified, configures time-based partitioning for this table.",
  example: JSON.stringify({
    type: "string",
    expirationMs: "string",
    field: "string",
    requirePartitionFilter: false,
  }),
  clean: jsonInputClean,
  required: false,
});

export const rangePartitioning = input({
  label: "Range Partitioning",
  type: "code",
  language: "json",
  comments: "If specified, configures range partitioning for this table.",
  example: JSON.stringify({
    field: "string",
    range: {
      start: "string",
      end: "string",
      interval: "string",
    },
  }),
  clean: jsonInputClean,
  required: false,
});

export const clustering = input({
  label: "Clustering",
  type: "code",
  language: "json",
  comments:
    "Clustering specification for the table. Must be specified with time-based partitioning, data in the table will be first partitioned and subsequently clustered.",
  example: JSON.stringify({
    fields: ["string", "string", "string"],
  }),
  clean: jsonInputClean,
  required: false,
});

export const tableReference = input({
  label: "Table Reference",
  type: "code",
  language: "json",
  comments: "Reference describing the ID of this routine.",
  example: JSON.stringify({
    projectId: "string",
    datasetId: "string",
    tableId: "string",
  }),
  clean: jsonInputClean,
  required: true,
});

export const tableView = input({
  label: "View",
  type: "code",
  language: "json",
  comments: "Optional. The view definition.",
  example: JSON.stringify({
    query: "string",
    userDefinedFunctionResources: [
      {
        resourceUri: "string",
        inlineCode: "string",
      },
    ],
    useLegacySql: false,
  }),
  clean: jsonInputClean,
  required: false,
});

export const materializedView = input({
  label: "Materialized View",
  type: "code",
  language: "json",
  comments: "Optional. The materialized view definition.",
  example: JSON.stringify({
    refreshWatermark: "string",
    lastRefreshStatus: {
      reason: "string",
      location: "string",
      debugInfo: "string",
      message: "string",
    },
  }),
  clean: jsonInputClean,
  required: false,
});

export const materializedViewStatus = input({
  label: "Materialized View Status",
  type: "code",
  language: "json",
  comments: "Optional. The materialized view status.",
  example: JSON.stringify({
    refreshWatermark: "string",
    lastRefreshStatus: {
      reason: "string",
      location: "string",
      debugInfo: "string",
      message: "string",
    },
  }),
  clean: jsonInputClean,
  required: false,
});

export const externalDataConfiguration = input({
  label: "External Data Configuration",
  type: "code",
  language: "json",
  comments:
    "Optional. Describes the data format, location, and other properties of a table stored outside of BigQuery. By defining these properties, the data source can then be queried as if it were a standard BigQuery table.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#externaldataconfiguration",
  clean: jsonInputClean,
  required: false,
});

export const streamingBuffer = input({
  label: "Streaming Buffer",
  type: "code",
  language: "json",
  comments:
    "Output only. Contains information regarding this table's streaming buffer, if one is present. This field will be absent if the table is not being streamed to or if there is no data in the streaming buffer.",
  example: JSON.stringify({
    estimatedBytes: "string",
    estimatedRows: "string",
    oldestEntryTime: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const snapshotDefinition = input({
  label: "Snapshot Definition",
  type: "code",
  language: "json",
  comments:
    "Output only. Contains information about the snapshot. This value is set via snapshot creation.",
  example: JSON.stringify({
    baseTableReference: {
      projectId: "string",
      datasetId: "string",
      tableId: "string",
    },
    snapshotTime: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const cloneDefinition = input({
  label: "Clone Definition",
  type: "code",
  language: "json",
  comments:
    "Output only. Contains information about the clone. This value is set via the clone operation.",
  example: JSON.stringify({
    baseTableReference: {
      projectId: "string",
      datasetId: "string",
      tableId: "string",
    },
    cloneTime: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const tableConstraints = input({
  label: "Table Constraints",
  type: "code",
  language: "json",
  comments: "Optional. Tables Primary Key and Foreign Key information",
  example: JSON.stringify({
    primaryKey: {
      columns: ["string"],
    },
    foreignKeys: [
      {
        name: "string",
        referencedTable: {
          projectId: "string",
          datasetId: "string",
          tableId: "string",
        },
        columnReferences: [
          {
            referencingColumn: "string",
            referencedColumn: "string",
          },
        ],
      },
    ],
  }),
  clean: jsonInputClean,
  required: false,
});


export const createTableInputs = {
  connectionInput,
  kind,
  tableReference,
  friendlyName,
  description,
  labels,
  schema,
  timePartitioning,
  rangePartitioning,
  clustering,
  requirePartitionFilter,
  expirationTime,
  view: tableView,
  materializedView,
  externalDataConfiguration,
  encryptionConfiguration,
  defaultCollation,
  defaultRoundingMode,
  maxStaleness,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the table to update.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the table to update.",
  }),
};

export const deleteTableInputs = {
  connectionInput,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the table to delete.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the table to delete.",
  }),
  tableId: input({
    ...tableId,
    required: true,
    comments: "Table ID of the table to delete.",
  }),
};

export const getTableInputs = {
  connectionInput,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the table to retrieve.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the table to retrieve.",
  }),
  tableId: input({
    ...tableId,
    required: true,
    comments: "Table ID of the table to retrieve.",
  }),
  selectedFields,
  view,
};

export const listTablesInputs = {
  connectionInput,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the tables to list.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the tables to list.",
  }),
  maxResults,
  pageToken,
};

export const patchTableInputs = {
  connectionInput,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the table to patch.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the table to patch.",
  }),
  tableId: input({
    ...tableId,
    required: true,
    comments: "Table ID of the table to patch.",
  }),
  kind,
  tableReference,
  friendlyName,
  description,
  labels,
  schema,
  timePartitioning,
  rangePartitioning,
  clustering,
  requirePartitionFilter,
  expirationTime,
  view: tableView,
  materializedView,
  externalDataConfiguration,
  encryptionConfiguration,
  defaultCollation,
  defaultRoundingMode,
  maxStaleness,
};

export const updateTableInputs = {
  connectionInput,
  datasetId: input({
    ...datasetId,
    required: true,
    comments: "Dataset ID of the table to update.",
  }),
  projectId: input({
    ...projectId,
    required: true,
    comments: "Project ID of the table to update.",
  }),
  tableId: input({
    ...tableId,
    required: true,
    comments: "Table ID of the table to update.",
  }),
  kind,
  tableReference,
  friendlyName,
  description,
  labels,
  schema,
  timePartitioning,
  rangePartitioning,
  clustering,
  requirePartitionFilter,
  expirationTime,
  view: tableView,
  materializedView,
  externalDataConfiguration,
  encryptionConfiguration,
  defaultCollation,
  defaultRoundingMode,
  maxStaleness,
};
