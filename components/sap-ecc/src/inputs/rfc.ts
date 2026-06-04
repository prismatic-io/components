import { input, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";
import { toOptionalString } from "../util";
import { connection } from "./common";

const endpoint = input({
  label: "Endpoint",
  type: "string",
  required: true,
  default: ENDPOINTS.SOAP_RFC,
  comments: "The SAP SOAP endpoint path.",
  example: ENDPOINTS.SOAP_RFC,
  placeholder: "Enter endpoint path",
  clean: util.types.toString,
});

const tableName = input({
  label: "Table Name",
  type: "string",
  required: true,
  comments: "The SAP table name to read from.",
  example: "T000",
  placeholder: "Enter table name",
  clean: util.types.toString,
});

const fields = input({
  label: "Fields",
  type: "string",
  required: true,
  comments:
    "Comma-separated list of field names to return. If empty, all fields are returned.",
  example: "MANDT,MTEXT,ORT01",
  placeholder: "Enter field names",
  clean: util.types.toString,
});

const rowCount = input({
  label: "Row Count",
  type: "string",
  required: false,
  comments: "Maximum number of rows to return. Leave empty for all rows.",
  example: "100",
  placeholder: "Enter row count",
  clean: toOptionalString,
});

const whereClause = input({
  label: "Where Clause",
  type: "string",
  required: false,
  comments:
    "ABAP WHERE clause to filter rows. Each condition must fit within 72 characters.",
  example: "MATNR EQ '000000000001'",
  placeholder: "Enter WHERE clause",
  clean: toOptionalString,
});

const rowSkips = input({
  label: "Row Skips",
  type: "string",
  required: false,
  default: "0",
  comments: "Number of rows to skip before returning results.",
  example: "10",
  placeholder: "Enter number of rows to skip",
  clean: toOptionalString,
});

export const readTableInputs = {
  connection,
  endpoint,
  tableName,
  fields,
  rowCount,
  rowSkips,
  whereClause,
};

const bapiName = input({
  label: "BAPI Name",
  type: "string",
  required: true,
  comments: "The BAPI or RFC function module name to call.",
  example: "BAPI_COMPANYCODE_GETLIST",
  placeholder: "Enter BAPI/RFC function name",
  dataSource: "selectBapi",
  clean: util.types.toString,
});

const bapiParameters = input({
  label: "BAPI Parameters",
  type: "code",
  required: false,
  language: "xml",
  comments:
    "XML parameters to pass to the BAPI. These are placed inside the SOAP envelope body for the function call.",
  example: "<COMPANYCODEID>1000</COMPANYCODEID>",
  placeholder: "Enter XML parameters",
  clean: toOptionalString,
});

const commitTransaction = input({
  label: "Commit Transaction",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically calls BAPI_TRANSACTION_COMMIT after the BAPI call succeeds, using the same HTTP session.",
  clean: util.types.toBool,
});

const waitOnCommit = input({
  label: "Wait on Commit",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, passes WAIT='X' to BAPI_TRANSACTION_COMMIT, which waits for the update task to complete before returning.",
  clean: util.types.toBool,
});

export const callBapiInputs = {
  connection,
  endpoint,
  bapiName,
  bapiParameters,
  commitTransaction,
  waitOnCommit,
};
