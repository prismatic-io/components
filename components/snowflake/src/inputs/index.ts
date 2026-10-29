import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";

export const snowflakeConnectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Snowflake connection to use.",
});

export const sqlInput = input({
  label: "SQL statements to run",
  type: "code",
  language: "sql",
  required: true,
  comments:
    "The SQL statement(s) to execute in Snowflake. Can be a single statement or multiple statements separated by semicolons.",
  example: "SELECT * FROM MY_TABLE WHERE created_at > '2024-01-01';",
  placeholder: "Enter SQL statement",
  clean: util.types.toString,
});

export const accountLocator = input({
  label: "Account Locator",
  placeholder: "Enter Account Locator",
  example: "xy12345",
  type: "string",
  required: true,
  comments:
    "The account locator for your Snowflake account. Find this in the organization's account panel. [Learn more](https://docs.snowflake.com/en/user-guide/admin-account-identifier#finding-the-region-and-locator-for-an-account)",
  clean: util.types.toString,
});

export const snowflakeUrl = input({
  label: "Snowflake Identifier URL",
  placeholder: "Enter Snowflake URL",
  example: "https://myorg-account123.snowflakecomputing.com",
  type: "string",
  required: true,
  comments:
    "The Snowflake URL for your account. Format: https://[account-identifier].snowflakecomputing.com",
  clean: util.types.toString,
});

export const nStatementsToExecute = input({
  label: "Number of statements to execute",
  example: "1",
  placeholder: "Enter number of statements",
  type: "string",
  required: false,
  comments:
    "The number of statements to execute. Use 0 to indicate a variable number of statements can be included in the request.",
  clean: util.types.toNumber,
});

export const timeout = input({
  label: "Timeout",
  example: "60",
  placeholder: "Enter timeout in seconds",
  type: "string",
  required: false,
  comments:
    "Timeout in seconds for statement execution. If the execution takes longer than the specified timeout, the execution is automatically canceled.",
  clean: (str: unknown) =>
    typeof str === "string" && str.length && !Number.isNaN(Number(str))
      ? util.types.toNumber(str)
      : undefined,
});

export const database = input({
  label: "Database",
  example: "MYDB",
  placeholder: "Enter database name",
  type: "string",
  required: false,
  comments: "The database name in which the statement should be executed.",
  clean: cleanString,
});

export const schema = input({
  label: "Schema",
  example: "PUBLIC",
  placeholder: "Enter schema name",
  type: "string",
  required: false,
  comments: "The schema name in which the statement should be executed.",
  clean: cleanString,
});

export const warehouse = input({
  label: "Warehouse",
  example: "COMPUTE_WH",
  placeholder: "Enter warehouse name",
  type: "string",
  required: false,
  comments: "The warehouse name to use when executing the statement.",
  clean: cleanString,
});

export const role = input({
  label: "Role",
  example: "ACCOUNTADMIN",
  placeholder: "Enter role name",
  type: "string",
  required: false,
  comments: "The role name to use when executing the statement.",
  clean: cleanString,
});

export const bindings = input({
  label: "Bindings",
  type: "code",
  language: "json",
  comments:
    "Values of bind variables in the SQL statement. Each binding has a type and value. [Learn more](https://docs.snowflake.com/en/user-guide/python-connector-api#binding-data)",
  example: JSON.stringify(
    {
      "1": { type: "FIXED", value: "123" },
      "2": { type: "TEXT", value: "teststring" },
    },
    null,
    2,
  ),
  placeholder: "Enter bindings JSON",
  required: false,
  clean: util.types.toObject,
});

export const parameters = input({
  label: "Parameters",
  type: "code",
  language: "json",
  comments:
    "Session parameters to set for this request. [Learn more](https://docs.snowflake.com/en/sql-reference/parameters)",
  example: JSON.stringify(
    {
      client_result_chunk_size: 100,
      date_output_format: "YYYY-MM-DD",
    },
    null,
    2,
  ),
  placeholder: "Enter parameters JSON",
  required: false,
  clean: util.types.toObject,
});

export const shouldPoll = input({
  label: "Poll for asynchronous results",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the action will handle polling for results on queries that take longer than 45 seconds to execute. When false, the action returns immediately after executing the query.",
  clean: util.types.toBool,
});

export const statementHandleId = input({
  label: "Statement Handle ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the statement handle returned from an asynchronous query execution.",
  example: "01b1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f",
  placeholder: "Enter Statement Handle ID",
  clean: util.types.toString,
});

export const partition = input({
  label: "Partition",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter partition number",
  comments: "The partition number to retrieve from the result set.",
  clean: util.types.toNumber,
});
