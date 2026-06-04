import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, recordsInputClean } from "../util";
import { connectionInput, externalIdFieldName, recordType, version } from "./common";
import {
  columnDelimiter,
  isPkChunkingEnabled,
  jobType,
  lineEnding,
  locator,
} from "./bulkQueryJobs";
import { file } from "./files";

export const records = input({
  label: "Records",
  placeholder: "Enter records as JSON array",
  comments:
    "The JSON array of records to be upserted. Each record must include the external ID field.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      { Name: "Record #1", ExtId__c: "ID-0000001" },
      { Name: "Record #2", ExtId__c: "ID-0000002" },
    ],
    null,
    2,
  ),
  clean: recordsInputClean,
});

export const allOrNone = input({
  label: "All Or None",
  type: "boolean",
  required: false,
  comments:
    "When true, any error in a subrequest causes the entire composite request to be rolled back. The top-level request returns HTTP 200 and includes responses for each subrequest.",
  clean: util.types.toBool,
  default: "true",
});

export const collateSubrequests = input({
  label: "Collate Subrequests",
  type: "boolean",
  required: false,
  comments:
    "When true, the API collates unrelated subrequests to bulkify them for improved performance.",
  clean: util.types.toBool,
  default: "false",
});

const object = input({
  label: "Object",
  type: "string",
  required: false,
  placeholder: "Enter object type",
  comments: "The object type for the data being processed. Use only a single object type per job.",
  example: "Account",
  clean: cleanStringInput,
});

const jobOperation = input({
  label: "Operation",
  type: "string",
  required: true,
  comments:
    "The data manipulation operation for the bulk job (e.g., insert, update, upsert, delete, or hardDelete).",
  model: [
    { label: "insert", value: "insert" },
    { label: "delete", value: "delete" },
    { label: "hardDelete", value: "hardDelete" },
    { label: "update", value: "update" },
    { label: "upsert", value: "upsert" },
  ],
  default: "insert",
  clean: util.types.toString,
});

const bulkJobId = input({
  label: "Bulk Job ID",
  placeholder: "Enter bulk job ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the bulk job returned from the Create Bulk Job action.",
  example: "750R0000000zlh9IAA",
  dataSource: "selectBulkJob",
  clean: util.types.toString,
});

const assignmentRuleId = input({
  label: "Assignment Rule ID",
  placeholder: "Enter assignment rule ID",
  type: "string",
  required: false,
  comments:
    "The ID of an assignment rule to run for a Case or a Lead. The assignment rule can be active or inactive.",
  example: "01Q7F0000004g8eUAA",
  clean: cleanStringInput,
});

export const createBulkJobInputs = {
  connection: connectionInput,
  version,
  object,
  operation: jobOperation,
  externalIdFieldName: {
    ...externalIdFieldName,
    required: false,
    comments:
      "The external ID field in the object being updated. Only needed for upsert operations. Field values must also exist in CSV job data.",
    clean: cleanStringInput,
  },
  assignmentRuleId,
  columnDelimiter,
  lineEnding,
};

export const bulkInsertRecordsInputs = {
  version,
  recordType,
  externalIdFieldName,
  file,
  connection: connectionInput,
};

export const bulkUpsertRecordsInputs = {
  version,
  recordType,
  externalIdFieldName,
  file,
  connection: connectionInput,
};

export const uploadJobDataInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
  file,
};

export const completeUploadBulkJobInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};

export const getBulkJobInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};

export const listBulkJobsInputs = {
  connection: connectionInput,
  version,
  isPkChunkingEnabled,
  jobType: {
    ...jobType,
    model: [
      { label: "Classic", value: "Classic" },
      { label: "BigObjectIngest", value: "BigObjectIngest" },
      { label: "V2Ingest", value: "V2Ingest" },
      { label: "Empty", value: "" },
    ],
  },
  queryLocator: locator,
};

export const abortBulkJobInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};

export const deleteBulkJobInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};

export const getJobSuccessfulRecordResultsInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};

export const getJobFailedRecordResultsInputs = {
  connection: connectionInput,
  version,
  bulkJobId,
};
