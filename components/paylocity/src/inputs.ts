import { input, util } from "@prismatic-io/spectral";
import {
  createEmployeeObj,
  earningInput,
  payEntryInputPayload,
  sensitiveDataPayload,
} from "./examplePayloads";
import { jsonInputClean } from "./util";

const environments = [
  {
    label: "Production",
    value: "Production",
  },
  {
    label: "Testing",
    value: "Testing",
  },
];

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const employeeId = input({
  label: "Employee ID",
  type: "string",
  required: true,
  comments: "The id of the employee to retrieve.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
  dataSource: "selectEmployee",
});

export const pagesize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "Number of records per page. Default value is 25. Max value is 5000. Leave blank to fetch all records.",
  example: "25",
  default: "25",
  clean: (value: unknown) => {
    return util.types.toInt(value, 0);
  },
});

export const includetotalcount = input({
  label: "Include Total Count",
  type: "boolean",
  required: false,
  comments:
    "Whether to include the total record count in the header's X-Pcty-Total-Count property. Default value is true.",
  default: "false",
  clean: util.types.toBool,
});

export const pagenumber = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments:
    "Page number to retrieve; page numbers are 0-based (so to get the first page of results, pass pagenumber=0). Default value is 0.",
  example: "0",
  default: "0",
  clean: util.types.toInt,
});

export const companyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  comments: "The id of the company to retrieve.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
});

export const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The id of the document to download.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The first name of the employee.",
  example: "John",
  clean: util.types.toString,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The last name of the employee.",
  example: "Doe",
  clean: util.types.toString,
});

export const employeeInput = input({
  label: "Employee",
  type: "code",
  language: "json",
  comments: "The employee to create or update.",
  default: JSON.stringify(createEmployeeObj, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const code = input({
  label: "Code",
  type: "string",
  required: true,
  comments:
    "A value sent with the 'ACTION NEEDED: Web Link API Credentials Expiring Soon.' email notification.",
  example: "123456",
  clean: util.types.toString,
});

export const codeResource = input({
  label: "Code Resource",
  type: "string",
  required: true,
  comments: "Type of Company Code.",
  example: "costcenter1",
  clean: util.types.toString,
  model: [
    { label: "costcenter1", value: "costcenter1" },
    { label: "costcenter2", value: "costcenter2" },
    { label: "costcenter3", value: "costcenter3" },
    { label: "deductions", value: "deductions" },
    { label: "earnings", value: "earnings" },
    { label: "taxes", value: "taxes" },
    { label: "paygrade", value: "paygrade" },
    { label: "positions", value: "positions" },
  ],
});

export const category = input({
  label: "Category",
  type: "string",
  required: true,
  comments: "Custom Fields Category",
  example: "example_field",
  clean: util.types.toString,
});

export const earningCode = input({
  label: "Earning Code",
  type: "string",
  required: true,
  comments: "The earning code of the employee.",
  example: "12345",
  clean: util.types.toString,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments: "The start date of the employee.",
  example: "2021-01-01",
  clean: util.types.toString,
});

export const earningsInput = input({
  label: "Earnings Input",
  type: "code",
  language: "json",
  comments: "The earnings to create or update.",
  default: JSON.stringify(earningInput, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const year = input({
  label: "Year",
  type: "string",
  required: false,
  comments: "The year for which to retrieve pay statement data",
  example: "2023",
  default: "2023",
  clean: util.types.toString,
});

export const checkDate = input({
  label: "Check Date",
  type: "string",
  required: false,
  comments: "The check date for which to retrieve pay statement data",
  example: "2023-01-01",
  clean: util.types.toString,
});

export const sensitiveDataInput = input({
  label: "Sensitive Data Input",
  type: "code",
  language: "json",
  comments: "The sensitive data to create or update.",
  default: JSON.stringify(sensitiveDataPayload, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments:
    "Defines the maximum number of items to be returned in the response.",
  example: "10",
  clean: util.types.toString,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  comments:
    "Defines the start location to return. Ex. offset=100 means starting at item 100, return the next [limit] items.",
  example: "10",
  clean: util.types.toString,
});

export const includeTotalCount = input({
  label: "Include Total Count",
  type: "boolean",
  required: false,
  comments:
    "Requests that the response include the Pcty-Total-Count header containing the total number of objects that match the request. This may be useful if requesting a small [limit].",
  example: "false",
  clean: util.types.toBool,
});

export const timeImportFileTrackingId = input({
  label: "Time Import File Tracking ID",
  type: "string",
  required: false,
  comments: "The tracking id of the time import file to retrieve.",
  example: "12345",
  clean: util.types.toString,
});

export const file = input({
  label: "File",
  placeholder: "File",
  type: "data",
  required: true,
  comments: "The file to upload.",
  example: "My File Contents",
  clean: util.types.toData,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name of the file to upload.",
  example: "an_example_name",
  clean: util.types.toString,
});

export const environment = input({
  label: "Environment",
  placeholder: "Environment",
  type: "string",
  required: true,
  shown: true,
  comments: "The environment to use for the Paylocity apis",
  model: environments,
});

export const payEntryInput = input({
  label: "Pay Entry Input",
  type: "code",
  language: "json",
  comments: "The pay entry fields to create or update",
  default: JSON.stringify(payEntryInputPayload, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const triggerCompanyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  comments: "The ID of the company to poll for new employees.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});
