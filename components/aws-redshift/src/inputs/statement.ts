import { input, util } from "@prismatic-io/spectral";
import {
  cleanSqlParameters,
  toOptionalNumber,
  toOptionalResultFormatString,
  toOptionalString,
} from "../util";
import type { StatusString } from "@aws-sdk/client-redshift-data";
import { RESULT_FORMAT_OPTIONS, STATUS_OPTIONS } from "../constants";
import {
  awsConnection,
  awsRegion,
  clusterIdentifier,
  databaseName,
  fetchAll,
  statementId,
  statementName,
  workgroupName,
} from "./common";

const databaseUser = input({
  label: "Database User",
  type: "string",
  required: false,
  comments:
    "The database user name. This parameter is required when connecting to a cluster as a database user and authenticating using temporary credentials.",
  example: "admin",
  placeholder: "Enter the database user",
  clean: toOptionalString,
});

const secretArn = input({
  label: "Secret ARN",
  type: "string",
  required: false,
  comments:
    "The ARN of the AWS Secrets Manager secret containing database credentials. Required when authenticating using Secrets Manager.",
  example: "arn:aws:secretsmanager:us-east-1:123456789012:secret:redshift-credentials",
  placeholder: "Enter the secret ARN",
  clean: toOptionalString,
});

const sqlStatement = input({
  label: "SQL Statement",
  type: "code",
  language: "sql",
  required: true,
  comments:
    "The SQL statement to run against the Redshift database. Supports DML (INSERT, UPDATE, DELETE), DDL (CREATE, DROP, ALTER), and query (SELECT) statements.",
  example: "SELECT * FROM users WHERE status = :status",
  placeholder: "SELECT * FROM users WHERE status = :status",
  clean: util.types.toString,
});

const sqlParameters = input({
  label: "SQL Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Named parameters that are substituted into the SQL statement at runtime using the colon-prefixed placeholder syntax (e.g., :status).",
  example: "status: active, limit: 100",
  clean: cleanSqlParameters,
});

const resultFormat = input({
  label: "Result Format",
  type: "string",
  required: false,
  default: "JSON",
  comments: "The format for query results (JSON or CSV).",
  example: "JSON",
  placeholder: "Enter the result format",
  model: RESULT_FORMAT_OPTIONS,
  clean: toOptionalResultFormatString,
});

const sessionId = input({
  label: "Session ID",
  type: "string",
  required: false,
  comments:
    "The ID of an existing session to reuse for statement execution, enabling multiple statements to share temporary tables and transaction state.",
  example: "session-12345678",
  placeholder: "Enter the session ID",
  clean: toOptionalString,
});

const sessionKeepAliveSeconds = input({
  label: "Session Keep Alive (seconds)",
  type: "string",
  required: false,
  comments: "Number of seconds to keep the session alive after query completion (max 24 hours).",
  example: "3600",
  placeholder: "Enter the keep alive duration in seconds",
  clean: toOptionalNumber,
});

const clientToken = input({
  label: "Client Token",
  type: "string",
  required: false,
  comments: "Unique identifier to ensure idempotency of the request.",
  example: "client-token-123",
  placeholder: "Enter the client token",
  clean: toOptionalString,
});

export const getStatementResult = input({
  label: "Get Statement Result",
  type: "boolean",
  required: false,
  comments:
    "When true, waits for the statement to finish executing and returns its result set. Only SELECT statements produce result rows. <strong>Note:</strong> long-running statements may cause a timeout.",
  example: "true",
  default: "true",
  clean: util.types.toBool,
});

const nextToken = input({
  label: "Next Token",
  type: "string",
  required: false,
  comments:
    "The pagination token returned from a previous list request, used to retrieve the next page of results.",
  example: "AQICAHi2k9rFZ...",
  placeholder: "Enter the next token",
  clean: toOptionalString,
});

const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments:
    "Filters the returned statements to only those matching this execution status. Use ALL to retrieve statements in any state.",
  example: "ALL",
  model: STATUS_OPTIONS,
  default: "ALL",
  clean: (value: unknown) => util.types.toString(value) as StatusString,
});

export const executeStatementInputs = {
  awsConnection,
  sqlStatement,
  databaseName,
  awsRegion,
  workgroupName,
  clusterIdentifier,
  getStatementResult,
  statementName,
  databaseUser,
  secretArn,
  sqlParameters,
  resultFormat,
  sessionId,
  sessionKeepAliveSeconds,
  clientToken,
};

export const getStatementResultInputs = {
  awsConnection,
  statementId: {
    ...statementId,
    comments: `${statementId.comments} <strong>Note:</strong> Only statements that return results are supported.`,
  },
  awsRegion,
  nextToken,
};

const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  comments: "The maximum number of SQL statements to return per page. Valid range: 0-100.",
  example: "100",
  placeholder: "100",
  clean: toOptionalNumber,
});

export const listStatementsInputs = {
  awsConnection,
  awsRegion,
  status,
  databaseName: {
    ...databaseName,
    required: false,
    comments:
      "The name of the database when listing statements run against a <code>ClusterIdentifier</code> or <code>WorkgroupName</code>.",
  },
  workgroupName: {
    ...workgroupName,
    required: false,
    comments:
      "The serverless workgroup name or Amazon Resource Name (ARN). Only statements that ran on this workgroup are returned. When providing <code>WorkgroupName</code>, then <code>ClusterIdentifier</code> can't be specified.",
  },
  clusterIdentifier: {
    ...clusterIdentifier,
    required: false,
    comments:
      "The cluster identifier. Only statements that ran on this cluster are returned. When providing <code>ClusterIdentifier</code>, then <code>WorkgroupName</code> can't be specified.",
  },
  statementName: {
    ...statementName,
    comments:
      "The name of the SQL statement specified as input to <code>BatchExecuteStatement</code> or <code>ExecuteStatement</code> to identify the query. Multiple statements can be matched by providing a prefix that matches the beginning of the statement name.",
  },
  fetchAll,
  nextToken,
  maxResults,
};

export const describeStatementInputs = {
  awsConnection,
  statementId,
  awsRegion,
};
