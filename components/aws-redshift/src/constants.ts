export const RESULT_FORMAT_OPTIONS = [
  { label: "JSON", value: "JSON" },
  { label: "CSV", value: "CSV" },
];

export const STATUS_OPTIONS = [
  { label: "ALL", value: "ALL" },
  { label: "ABORTED", value: "ABORTED" },
  { label: "FAILED", value: "FAILED" },
  { label: "FINISHED", value: "FINISHED" },
  { label: "PICKED", value: "PICKED" },
  { label: "STARTED", value: "STARTED" },
  { label: "SUBMITTED", value: "SUBMITTED" },
];

export const RAW_REQUEST_ACTION_OPTIONS = [
  { label: "BatchExecuteStatement", value: "RedshiftData.BatchExecuteStatement" },
  { label: "CancelStatement", value: "RedshiftData.CancelStatement" },
  { label: "DescribeStatement", value: "RedshiftData.DescribeStatement" },
  { label: "DescribeTable", value: "RedshiftData.DescribeTable" },
  { label: "ExecuteStatement", value: "RedshiftData.ExecuteStatement" },
  { label: "GetStatementResult", value: "RedshiftData.GetStatementResult" },
  { label: "GetStatementResultV2", value: "RedshiftData.GetStatementResultV2" },
  { label: "ListDatabases", value: "RedshiftData.ListDatabases" },
  { label: "ListSchemas", value: "RedshiftData.ListSchemas" },
  { label: "ListStatements", value: "RedshiftData.ListStatements" },
  { label: "ListTables", value: "RedshiftData.ListTables" },
];
