import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean, valueListInputClean } from "../util";
import {
  connectionInput,
  etag,
  id,
  kind,
  labels,
  location,
  maxResults,
  pageToken,
  projectId,
  selfLink,
  startIndex,
} from "./common";

export const jobId = input({
  label: "Job ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the job.",
  example: "job_abc123xyz",
  placeholder: "Enter job ID",
  required: true,
  dataSource: "selectJob",
});

export const allUsers = input({
  label: "All Users",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, displays jobs owned by all users in the project. Default is false.",
  required: false,
});

export const minCreationTime = input({
  label: "Min Creation Time",
  type: "string",
  clean: cleanString,
  comments:
    "Min value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created after or at this timestamp are returned.",
  example: "1609459200000",
  placeholder: "Enter minimum creation time (milliseconds)",
  required: false,
});

export const maxCreationTime = input({
  label: "Max Creation Time",
  type: "string",
  clean: cleanString,
  comments:
    "Max value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created before or at this timestamp are returned.",
  example: "1640995200000",
  placeholder: "Enter maximum creation time (milliseconds)",
  required: false,
});

export const parentJobId = input({
  label: "Parent Job ID",
  type: "string",
  clean: cleanString,
  comments:
    "If set, shows only child jobs of the specified parent. Otherwise, shows all top-level jobs.",
  example: "parent_job_abc123",
  placeholder: "Enter parent job ID",
  required: false,
});

export const projection = input({
  label: "Projection",
  type: "string",
  clean: util.types.toString,
  comments: "Restrict information returned to a set of selected fields",
  placeholder: "Select projection",
  model: [
    {
      label: "MINIMAL",
      value: "MINIMAL",
    },
    {
      label: "FULL",
      value: "FULL",
    },
  ],
});

export const stateFilter = input({
  label: "State Filter",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Filter for job state. Valid values of this enum field are: DONE, PENDING, RUNNING.",
  example: '["DONE", "RUNNING"]',
  placeholder: "Select job states",
  clean: valueListInputClean,
});

export const timeoutMs = input({
  label: "Timeout (ms)",
  type: "string",
  clean: util.types.toNumber,
  comments:
    "Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. By default, this limit is 10 seconds (10,000 milliseconds). If the query is complete, the jobComplete field in the response is true. If the query has not yet completed, jobComplete is false. You can request a longer timeout period in the timeoutMs field. However, the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. If jobComplete is false, you can continue to wait for the query to complete by calling the getQueryResults method until the jobComplete field in the getQueryResults response is true.",
  example: "10000",
  placeholder: "Enter timeout in milliseconds",
  required: false,
});

export const dryRun = input({
  label: "Dry Run",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, BigQuery doesn't run the job. Instead, if the query is valid, BigQuery returns statistics about the job such as how many bytes would be processed. If the query is invalid, an error returns. The default value is false.",
  required: false,
});

export const useQueryCache = input({
  label: "Use Query Cache",
  type: "boolean",
  clean: util.types.toBool,
  default: "true",
  comments:
    "When true, looks for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. The default value is true.",
  required: false,
});

export const useLegacySql = input({
  label: "Use Legacy SQL",
  type: "boolean",
  clean: util.types.toBool,
  default: "false",
  comments:
    "Specifies whether to use BigQuery's legacy SQL dialect for this query. [BigQuery's GoogleSQL](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)",
  required: false,
});

export const parameterMode = input({
  label: "Parameter Mode",
  type: "string",
  clean: util.types.toString,
  comments:
    "GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query.",
  example: "NAMED",
  placeholder: "Enter parameter mode",
  required: false,
});

export const userEmail = input({
  label: "User Email",
  type: "string",
  clean: util.types.toString,
  comments: "Output only. Email address of the user who ran the job.",
  example: "user@example.com",
  placeholder: "Enter user email",
  required: false,
});

export const principalSubject = input({
  label: "Principal Subject",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. [Full-projection-only] String representation of identity of requesting party. Populated for both first- and third-party identities. Only present for APIs that support third-party identities.",
  example: "user:user@example.com",
  placeholder: "Enter principal subject",
  required: false,
});

export const maximumBytesBilled = input({
  label: "Maximum Bytes Billed",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. Limits the bytes billed for this query. Queries with bytes billed above this limit will fail (without incurring a charge). If unspecified, the project default is used.",
  example: "1000000000",
  placeholder: "Enter maximum bytes billed",
  required: false,
});

export const requestId = input({
  label: "Request ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. A unique user provided identifier to ensure idempotent behavior for queries. Note that this is different from the jobId. It has the following properties: It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended. Read only queries can ignore this token since they are nullipotent by definition. For the purposes of idempotency ensured by the requestId, a request is considered duplicate of another only if they have the same requestId and are actually duplicates. When determining whether a request is a duplicate of another request, all parameters in the request that may affect the result are considered. For example, query, connectionProperties, queryParameters, useLegacySql are parameters that affect the result and are considered when determining whether a request is a duplicate, but properties like timeoutMs don't affect the result and are thus not considered. Dry run query requests are never considered duplicate of another request. When a duplicate mutating query request is detected, it returns: a. the results of the mutation if it completes successfully within the timeout. b. the running operation if it is still in progress at the end of the timeout. Its lifetime is limited to 15 minutes. In other words, if two requests are sent with the same requestId, but more than 15 minutes apart, idempotency is not guaranteed.",
  example: "550e8400-e29b-41d4-a716-446655440000",
  placeholder: "Enter request ID",
  required: false,
});

export const createSession = input({
  label: "Create Session",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, creates a new session using a randomly generated sessionId. If false, runs query with an existing sessionId passed in ConnectionProperty, otherwise runs query in non-session mode. The session location will be set to QueryRequest.location if it is present, otherwise it's set to the default location based on existing routing logic.",
  required: false,
});

export const query = input({
  label: "Query",
  type: "string",
  clean: util.types.toString,
  comments:
    "Required. A query string to execute, using Google Standard SQL or legacy SQL syntax. Example: 'SELECT COUNT(f1) FROM myProjectId.myDatasetId.myTableId'.",
  example: "SELECT COUNT(f1) FROM myProjectId.myDatasetId.myTableId",
  placeholder: "Enter SQL query",
  required: true,
});

export const configuration = input({
  label: "Configuration",
  type: "code",
  language: "json",
  comments: "Required. Describes the job configuration.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobconfiguration",
  clean: jsonInputClean,
  required: true,
});

export const jobReference = input({
  label: "Job Reference",
  type: "code",
  language: "json",
  comments:
    "Optional. Reference describing the unique-per-user name of the job.",
  example: JSON.stringify({
    projectId: "string",
    jobId: "string",
    location: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const statistics = input({
  label: "Statistics",
  type: "code",
  language: "json",
  comments:
    "Output only. Information about the job, including starting time and ending time of the job.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobstatistics",
  clean: jsonInputClean,
  required: false,
});

export const status = input({
  label: "Status",
  type: "code",
  language: "json",
  comments:
    "Output only. The status of this job. Examine this value when polling an asynchronous job to see if the job is complete.",
  example: JSON.stringify({
    errorResult: {
      reason: "string",
      location: "string",
      debugInfo: "string",
      message: "string",
    },
    errors: [
      {
        reason: "string",
        location: "string",
        debugInfo: "string",
        message: "string",
      },
    ],
    state: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const defaultDataset = input({
  label: "Default Dataset",
  type: "code",
  language: "json",
  comments:
    "Optional. Specifies the default datasetId and projectId to assume for any unqualified table names in the query. If not set, all table names in the query string must be qualified in the format 'datasetId.tableId'.",
  example: JSON.stringify({
    datasetId: "string",
    projectId: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const queryParameters = input({
  label: "Query Parameters",
  type: "code",
  language: "json",
  comments:
    "Optional. An array of query parameters for a query. Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/QueryParameter",
  example: JSON.stringify([
    {
      name: "name",
      parameterType: {
        type: "STRING",
      },
      parameterValue: {
        value: "value",
      },
    },
  ]),
  clean: jsonInputClean,
  required: false,
});

export const connectionProperties = input({
  label: "Connection Properties",
  type: "code",
  language: "json",
  comments:
    "Optional. Connection properties which can modify the query behavior.",
  example: JSON.stringify([
    {
      key: "string",
      value: "string",
    },
  ]),
  clean: jsonInputClean,
  required: false,
});


export const cancelJobInputs = {
  connectionInput,
  projectId,
  jobId,
  location,
};

export const createJobInputs = {
  connectionInput,
  projectId,
  configuration,
  kind,
  etag,
  id,
  selfLink,
  userEmail,
  jobReference,
  statistics,
  status,
};

export const deleteJobInputs = {
  connectionInput,
  projectId,
  jobId,
  location,
};

export const getJobInputs = {
  connectionInput,
  projectId,
  jobId,
  location,
};

export const getQueryJobResultInputs = {
  connectionInput,
  projectId,
  jobId,
  startIndex,
  pageToken,
  maxResults,
  timeoutMs,
  location,
};

export const listJobsInputs = {
  connectionInput,
  projectId,
  pageToken,
  allUsers,
  maxResults,
  minCreationTime,
  maxCreationTime,
  projection,
  stateFilter,
  parentJobId,
};

export const queryJobInputs = {
  connectionInput,
  projectId,
  kind,
  query,
  maxResults,
  defaultDataset,
  timeoutMs,
  dryRun,
  useQueryCache,
  useLegacySql,
  parameterMode,
  queryParameters,
  location,
  connectionProperties,
  labels,
  maximumBytesBilled,
  requestId,
  createSession,
};
