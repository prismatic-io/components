import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean, valueListInputClean } from "../util";
import {
  connectionInput,
  creationTime,
  datasetId,
  description,
  etag,
  filter,
  lastModifiedTime,
  maxResults,
  pageToken,
  projectId,
} from "./common";

export const routineId = input({
  label: "Routine ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the routine.",
  example: "my_routine",
  placeholder: "Enter routine ID",
  required: true,
  dataSource: "selectRoutine",
});

export const readMask = input({
  label: "Read Mask",
  type: "string",
  clean: cleanString,
  comments:
    "If set, only the Routine fields in the field mask are returned in the response. If unset, all Routine fields are returned. This is a comma-separated list of fully qualified names of fields. Example: 'user.displayName,photo'.",
  example: "user.displayName,photo",
  placeholder: "Enter read mask",
  required: false,
});

export const routineType = input({
  label: "Routine Type",
  type: "string",
  clean: util.types.toString,
  comments:
    "The type of routine. One of ROUTINE_TYPE_UNSPECIFIED / SCALAR_FUNCTION / PROCEDURE / TABLE_VALUED_FUNCTION",
  example: "SCALAR_FUNCTION",
  placeholder: "Enter routine type",
  required: true,
});

export const definitionBody = input({
  label: "Definition Body",
  type: "string",
  clean: util.types.toString,
  comments:
    "Required. The body of the routine. For functions, this is the expression in the AS clause. If language=SQL, it is the substring inside (but excluding) the parentheses. For example, for the function created with the following statement: CREATE FUNCTION JoinLines(x string, y string) as (concat(x, '\\n', y)) The definitionBody is concat(x, '\\n', y) (\\n is not replaced with linebreak). If language=JAVASCRIPT, it is the evaluated string in the AS clause. For example, for the function created with the following statement: CREATE FUNCTION f() RETURNS STRING LANGUAGE js AS 'return '\\n';\\n'The definitionBody is return '\\n';\\n Note that both \\n are replaced with linebreaks.",
  example: "concat(x, '\\n', y)",
  placeholder: "Enter definition body",
  required: true,
});

export const determinismLevel = input({
  label: "Determinism Level",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. The determinism level of the JavaScript UDF, if defined. One of DETERMINISM_LEVEL_UNSPECIFIED / DETERMINISTIC / NOT_DETERMINISTIC",
  example: "DETERMINISTIC",
  placeholder: "Enter determinism level",
  required: false,
});

export const language = input({
  label: "Language",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. Defaults to 'SQL' if remoteFunctionOptions field is absent, not set otherwise. One of LANGUAGE_UNSPECIFIED / SQL / JAVASCRIPT / PYTHON / JAVA / SCALA",
  example: "SQL",
  placeholder: "Enter language",
  required: false,
});

export const importedLibraries = input({
  label: "Imported Libraries",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Optional. If language = 'JAVASCRIPT', this field stores the path of the imported JAVASCRIPT libraries.",
  example: '["gs://bucket/path/lib.js"]',
  placeholder: "Enter library paths",
  clean: valueListInputClean,
});

export const routineReference = input({
  label: "Routine Reference",
  type: "code",
  language: "json",
  comments: "Reference describing the ID of this routine.",
  example: JSON.stringify({
    projectId: "string",
    datasetId: "string",
    routineId: "string",
  }),
  clean: jsonInputClean,
  required: true,
});

export const argument = input({
  label: "Arguments",
  type: "code",
  language: "json",
  comments: "Input/output argument of a function or a stored procedure.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/routines#argument",
  clean: jsonInputClean,
  required: false,
});

export const returnType = input({
  label: "Return Type",
  type: "code",
  language: "json",
  comments:
    "Optional if language = 'SQL'; required otherwise. Cannot be set if routineType = 'TABLE_VALUED_FUNCTION'. If absent, the return type is inferred from definitionBody at query time in each query that references this routine. If present, then the evaluated result will be cast to the specified returned type at query time.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/StandardSqlDataType",
  clean: jsonInputClean,
  required: false,
});

export const returnTableType = input({
  label: "Return Table Type",
  type: "code",
  language: "json",
  comments:
    "Optional. Can be set only if routineType = 'TABLE_VALUED_FUNCTION'. If absent, the return table type is inferred from definitionBody at query time in each query that references this routine. If present, then the columns in the evaluated table result will be cast to match the column types specified in return table type, at query time.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/StandardSqlDataType",
  clean: jsonInputClean,
  required: false,
});

export const remoteFunctionOptions = input({
  label: "Remote Function Options",
  type: "code",
  language: "json",
  comments: "Optional. Remote function specific options.",
  example: JSON.stringify({
    endpoint: "string",
    connection: "string",
    userDefinedContext: {
      string: "string",
      string2: "string",
      string3: "string",
    },
    maxBatchingRows: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const sparkOptions = input({
  label: "Spark Options",
  type: "code",
  language: "json",
  comments: "Optional. Spark specific options.",
  example: JSON.stringify({
    connection: "string",
    runtimeVersion: "string",
    containerImage: "string",
    properties: {
      string: "string",
      string2: "string",
      string3: "string",
    },
    mainFileUri: "string",
    pyFileUris: ["string"],
    jarUris: ["string"],
    fileUris: ["string"],
    archiveUris: ["string"],
    mainClass: "string",
  }),
  clean: jsonInputClean,
  required: false,
});


export const createRoutineInputs = {
  connectionInput,
  datasetId,
  projectId,
  routineReference,
  routineType,
  definitionBody,
  etag,
  argument,
  returnTableType,
  returnType,
  creationTime,
  lastModifiedTime,
  language,
  importedLibraries,
  description: {
    ...description,
    comments: "Optional. The description of the routine, if defined.",
  },
  determinismLevel,
  remoteFunctionOptions,
  sparkOptions,
};

export const deleteRoutineInputs = {
  connectionInput,
  datasetId,
  projectId,
  routineId,
};

export const getRoutineInputs = {
  connectionInput,
  datasetId,
  projectId,
  readMask,
  routineId,
};

export const listRoutinesInputs = {
  connectionInput,
  projectId,
  datasetId,
  filter,
  pageToken,
  maxResults,
  readMask,
};

export const updateRoutineInputs = {
  connectionInput,
  datasetId,
  projectId,
  routineReference,
  routineType,
  definitionBody,
  etag,
  argument,
  returnTableType,
  returnType,
  creationTime,
  lastModifiedTime,
  language,
  importedLibraries,
  description: {
    ...description,
    comments: "Optional. The description of the routine, if defined.",
  },
  determinismLevel,
  remoteFunctionOptions,
  sparkOptions,
};
